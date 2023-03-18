import time
import asyncio
import datetime
import json
import websockets
from typing import Generator
from websockets import WebSocketServerProtocol


class Function:
    """Function passed from web for exection."""

    def __init__(self, obj: object, name: str, args: list = None, kwargs: dict = None):
        self.obj = obj
        self.name = name
        self.args = args if args else []
        self.kwargs = kwargs if kwargs else {}
        self.yld = None
        self.state = "init"

    def run(self):
        self.state = "run"
        resp = getattr(self.obj, self.name)(*self.args, **self.kwargs)
        if isinstance(resp, Generator):
            for i in getattr(self.obj, self.name)(*self.args):
                self.yld = i
                yield i
        else:
            self.yld = resp
            yield resp

    @property
    def json(self):
        return {"name": self.name, "args": self.args, "kwargs": self.kwargs, "yld": self.yld, "state": self.state}


class Session:
    """Class to hold a connection."""

    def __init__(self, id, seq, function=None):
        self.id: str = id
        self.seq: int = seq
        self.function: Function = function
        self.control = "closed"
        self.timeout = None

    def __str__(self):
        return json.dumps({
            "id": self.id,
            "seq": self.seq,
            "control": self.control,
            "timeout": self.timeout,
            "function": self.function.json if self.function else None
        })


class Router:
    def __init__(self, port):
        self.session = None
        self.time = 0
        self.port = port

    async def handle(self, websocket: WebSocketServerProtocol, path):
        """Handles incoming connections."""
        while True:
            now = datetime.datetime.utcnow().isoformat() + 'Z'
            raw_data = await websocket.recv()
            try:
                data = json.loads(raw_data)
                print(f"R:{data}")

                if not self.session and data['control'] == "ping":
                    self.session = Session(data['id'], 0)
                    self.session.seq += 1
                    self.session.control = "pong"
                elif self.session.id == data['id'] and data['seq'] == self.session.seq + 1:
                    # Finish session, open up for new sessions
                    if data.get('control', None) == 'finish':
                        self.session.control = 'finished'
                        await websocket.send(str(self.session))
                        print(f"S:{self.session}")
                        self.session = None
                        continue
                    else:
                        self.session.control = None
                    self.session.seq += 2
                    if not self.session.function:
                        self.session.function = Function(
                            obj=self,
                            name=data.get('function').get('name'),
                            args=data.get('function').get('args', None),
                            kwargs=data.get('function').get('kwargs', None),
                        )
                        if not self.session.timeout:
                            self.session.timeout = data.get('timeout', 1)
                            asyncio.get_event_loop().create_task(self.start_timer(self.session, self.session.timeout, websocket))
                    elif self.session.function.name == data.get('function').get('name'):
                        print(f"Running: {data.get('function').get('name')}")
                        for resp in self.session.function.run():
                            self.session.seq += 1
                            await websocket.send(str(self.session))
                            print(f"S:{self.session}")
                        self.session.function.state = "done"
                        self.session.function.yld = None
                        await websocket.send(str(self.session))
                        print(f"S:{self.session}")
                        self.session.function = None
                        self.session.timeout = None
                elif self.session and self.session.id != data['id']:
                    await websocket.send(json.dumps({"error": {"type": "BadSession", "msg": "bad session"}}))
                    print(f"S:{json.dumps({'error': {'type': 'BadSession', 'msg': 'bad session'}})}")
                    continue
                if self.session:
                    await websocket.send(str(self.session))
                    print(f"S:{self.session}")
            except Exception as e:
                await websocket.send(json.dumps({"error": {"type": "PythonError", "msg": str(e)}}))
                print(f"S:{json.dumps({'error': {'type': 'PythonError', 'msg': str(e)}})}")
                continue

    async def start_timer(self, session: Session, duration: float, websocket: WebSocketServerProtocol):
        if not duration:
            duration = 1
        await asyncio.sleep(duration)
        if session.function:
            session.function = None
            session.timeout = None
            await websocket.send(json.dumps({"error": {"type": "Timeout", "msg": "timeout"}}))
            print(f"S:{json.dumps({'error': {'type': 'Timeout', 'msg': 'timeout'}})}")

    async def async_start(self):
        self.start()

    def start(self):
        server = self.get_server()
        asyncio.get_event_loop().run_until_complete(server)
        asyncio.get_event_loop().run_forever()

    def get_server(self):
        return websockets.serve(self.handle, '0.0.0.0', self.port)

    async def async_get_server(self):
        return websockets.serve(self.handle, '0.0.0.0', self.port)


class MessageRouter(Router):
    """Sample object."""

    def send_message(self, to, message):
        print("send_message:", to, message)
        return "MESSAGE SENT!"


if __name__ == '__main__':
    actor = MessageRouter(port=9090)
    actor.start()