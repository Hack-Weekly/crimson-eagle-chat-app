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

<img width="682" alt="image" src="https://user-images.githubusercontent.com/2836129/227125886-e2162adc-31a8-400d-b4ea-52fb746f637e.png">

The above image demonstrates a message send and acknowledgement.

# Aux

```
docker-compose up -d rabbitmq
```
RabbitMQ web gui http://127.0.0.1:15672/

# Functions

## send_message

This message is tells the server to send a message to someone.

Required arguments: to, sender, message

After posting the message over websockets, you can see the message in the rabbitmq queue for the sender.  We'll be creating a queue for each user. They will consume the queue and drop the messages into the appropriate box by sender.

![image](https://user-images.githubusercontent.com/2836129/226083153-20934c0f-c7c3-40b7-813b-794e1d4dab85.png)

![image](https://user-images.githubusercontent.com/2836129/226083171-ffb5eaad-4081-456b-9e97-63b5be228366.png)
