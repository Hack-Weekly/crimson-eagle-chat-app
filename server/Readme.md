# Basics

```
docker-compose up websocket
```

Websocket service should come up

```
crimson-eagle-chat-app_rabbitmq_1 is up-to-date
Starting websocket ... done
Attaching to websocket
```

open `server/websocket.html`

This will bring up the RealTask playground for debugging the server.

<img width="1297" alt="image" src="https://user-images.githubusercontent.com/2836129/226075410-aa546896-edee-4532-82b0-7dddc9f1829a.png">

The above image demonstrates the minimum steps to send a message.

| Parameter | Description |
| ---- | ---- |
| id | unique session ID. Client can generate this |
| seq | sequence number (each client sequence number must incriment to ensure server/client order |
| timeout | used to declare a client side required timeout length. For basic examples, set this to something high ~10,000 |
| funciton | used to declare a function to run on server side. `send_message` is the name of the messaging function <br /> **name**: Name of the function. <br /> **args**: arguments to pass <br />**kwargs**: dictionary of arguments.<br />**ydl**: what the function yeilds/returns|


# Functions

## send_message

This message is tells the server to send a message to someone.

Required arguments: to, message
