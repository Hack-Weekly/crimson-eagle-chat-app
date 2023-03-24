import time
import pika
import asyncio
import datetime
import json
import websockets
from typing import Generator
from websockets import WebSocketServerProtocol


# class Function:
#     """Function passed from web for execution."""
#
#     def __init__(self, obj: object, name: str, args: list = None, kwargs: dict = None):
#         self.obj = obj
#         self.name = name
#         self.args = args if args else []
#         self.kwargs = kwargs if kwargs else {}
#         self.yld = None
#         self.state = "init"
#
#     def run(self):
#         self.state = "run"
#         resp = getattr(self.obj, self.name)(*self.args, **self.kwargs)
#         if isinstance(resp, Generator):
#             for i in getattr(self.obj, self.name)(*self.args):
#                 self.yld = i
#                 yield i
#         else:
#             self.yld = resp
#             yield resp
#
#     @property
#     def json(self):
#         return {"name": self.name, "args": self.args, "kwargs": self.kwargs, "yld": self.yld, "state": self.state}


# class Session:
#     """Class to hold a connection."""
#
#     def __init__(self, id, seq, function=None):
#         self.id: str = id
#         self.seq: int = seq
#         self.function: Function = function
#         self.control = "closed"
#         self.timeout = None
#
#     def __str__(self):
#         return json.dumps({
#             "id": self.id,
#             "seq": self.seq,
#             "control": self.control,
#             "timeout": self.timeout,
#             "function": self.function.json if self.function else None
#         })


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

                response = {}
                if data['function'] == "ping":
                    response = {
                        "result": "pong"
                    }
                elif data['function'] == "send":
                    if "msg" not in data.keys():
                        raise MessageInvalidException("Missing 'msg' field")
                    if "to" not in data.keys():
                        raise MessageInvalidException("Missing 'to' field")

                    response = {
                        "result": "sent",
                        "detail": data['msg']
                    }
                    await RabbitMQController.send_message('', data['to'], data['msg'])

                await websocket.send(json.dumps(response))

            except MessageInvalidException as e:
                err = {'error': {'type': 'validation', 'msg': e.msg}}
                await websocket.send(json.dumps(err))
                print(f"S:{json.dumps(err)}")
                continue
            except Exception as e:
                err = {'error': {'type': 'PythonError', 'msg': f'{type(e).__name__}:{e}'}}
                await websocket.send(json.dumps(err))
                print(f"S:{json.dumps(err)}")
                continue

    # async def start_timer(self, session: Session, duration: float, websocket: WebSocketServerProtocol):
    #     if not duration:
    #         duration = 1
    #     await asyncio.sleep(duration)
    #     if session.function:
    #         session.function = None
    #         session.timeout = None
    #         await websocket.send(json.dumps({"error": {"type": "Timeout", "msg": "timeout"}}))
    #         print(f"S:{json.dumps({'error': {'type': 'Timeout', 'msg': 'timeout'}})}")

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


class MessageInvalidException(Exception):
    def __init__(self, msg):
        self.msg = msg

    def __str__(self):
        return self.msg


class MessageRouter(Router):
    """Sample object."""

    def send_message(self, sender, to, message):
        print("send_message:", to, message)

        RabbitMQController.send_message(sender, to, message)

        return "MESSAGE SENT!"


class RabbitMQController:
    @classmethod
    async def send_message(cls, sender, to, message):
        to = str(to)

        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()
        channel.queue_declare(queue=to)

        body = json.dumps({
            "sender": sender,
            "to": to,
            "message": message
        }).encode('utf-8')

        channel.basic_publish(exchange='', routing_key=to, body=body)
        connection.close()


if __name__ == '__main__':
    actor = MessageRouter(port=9090)
    actor.start()