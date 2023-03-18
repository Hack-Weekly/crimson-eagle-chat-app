import json
import pika
import asyncio
import pytest
import time
import websocket

from unittest import TestCase, IsolatedAsyncioTestCase

from ws import RabbitMQController, Router


class TestWebsocket(TestCase):
    def test_websocket(self):
        rc = RabbitMQController()
        rc.send_message("tom", "mike", "Hey Mike!")

    def test_consume(self):
        def on_message(channel, method_frame, header_frame, body):
            print(method_frame.delivery_tag)
            print(body)
            print()
            channel.basic_ack(delivery_tag=method_frame.delivery_tag)

        connection = pika.BlockingConnection()
        channel = connection.channel()
        channel.basic_consume('mike', on_message)

        try:
            channel.start_consuming()
        except KeyboardInterrupt:
            channel.stop_consuming()
        connection.close()


class TestRouter(IsolatedAsyncioTestCase):
    @pytest.mark.asyncio
    async def test_connect(self):
        self.port = 9090
        self.actor = Router(self.port)
        loop = asyncio.get_event_loop()
        # task = loop.create_task(self.actor.async_start())
        # loop.run_until_complete(self.actor.get_server())
        # asyncio.get_event_loop().run_forever()
        # await self.actor.async_start()

        # server = self.actor.async_start()
        # await loop.run_until_complete(server)

        loop.create_task(self.actor.async_get_server())

        # loop.create_task(websockets.serve(self.actor.handle, '127.0.0.1', self.port))

        ws = websocket.WebSocket()
        time.sleep(1)

        ws.connect(f"ws://127.0.0.1:{self.port}")

        ws.send(json.dumps({"id": "gyNjg", "seq": 0, "control": "ping"}))
        time.sleep(.1)
        print(ws.recv())

        ws.send(json.dumps({"id": "gyNjg", "seq": 2, "function":
            {"name": "send_message", "kwargs": {"to": "mike", "message": "hello mike", "sender": "Tom"}}}))
        time.sleep(.1)
        print(ws.recv())

        ws.send(json.dumps({"id": "gyNjg", "seq": 4, "function":
            {"name": "send_message", "kwargs": {"to": "mike", "message": "hello mike", "sender": "Tom"}}}))
        time.sleep(.1)
        print(ws.recv())

        ws.close()