import { TextMessage, Timeline } from './message-type'

export interface ChatProps {
  type: string
  message?: string
  incoming?: boolean
  outgoing?: boolean
  text?: string
  subtype?: string
  img?: string
  preview?: string
  reply?: string
  menu?: boolean
}

//fetch chats
//to avoid errors for now, install this browser extension: https://modheader.com/modheader
//while on the dev server, in your browser, click the extension and enter these credentials:
//name: Authorization
//pass: Basic YWRtaW46cXdlcnF3ZXI=
//doing this will allow you to retrieve chat data from the server until we set up more backend stuff
//note, you will get an empty response because data does not persist yet
//to enter your own test chat data, start the django container in docker and open localhost on port 8000
//username: admin
//pass: qwerqwer
//click add under Message to create some dummy data
//note, dummy data will be lost if the container is closed, but this is temporary
const fetchChatData = async () => {
  try {
    const data = await fetch('http://127.0.0.1:8000/api/messages/')
    const chatData = await data.json()
    console.log('CHAT DATA:', chatData)
    return chatData
  } catch (err: any) {
    console.log(err.message)
  }
}
console.log(fetchChatData())

const postData = async (id: string, message: string, partner: string) => {
  try {
    await fetch('http://127.0.0.1:8000/api/messages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        text: message,
        timestamp: Date.now(),
        to: partner,
      }),
    })
    console.log('Message sent!')
  } catch (err: any) {
    console.log(err.message)
  }
}
postData('001', 'test message!', '002')

const Message = ({ menu }: { menu: boolean }) => {
  const renderMessage = (chat: ChatProps, idx: number) => {
    switch (chat.type) {
      case 'divider':
        return <Timeline key={idx} {...chat} />
      case 'msg':
        return <TextMessage key={idx} {...chat} menu={menu} />
      default:
        break
    }
  }
  return (
    <>
      {Chat_History.map((chat, idx) => {
        return renderMessage(chat, idx)
      })}
    </>
  )
}

export default Message

const Chat_History = [
  {
    type: 'msg',
    message: 'Hi, how are you?',
    incoming: true,
    outgoing: false,
    time: '10:00 AM',
  },
  {
    type: 'msg',
    message: "I'm good, thanks. How about you?",
    incoming: false,
    outgoing: true,
    time: '10:01 AM',
  },
  {
    type: 'msg',
    message: "I'm doing well too, thanks for asking.",
    incoming: true,
    outgoing: false,
    time: '10:02 AM',
  },
  {
    type: 'msg',
    message: 'What are you up to today?',
    incoming: false,
    outgoing: true,
    time: '10:03 AM',
  },
  {
    type: 'msg',
    message: 'Not much, just working on some projects. How about you?',
    incoming: true,
    outgoing: false,
    time: '10:04 AM',
  },
  {
    type: 'msg',
    message: 'Same here, just trying to get some work done.',
    incoming: false,
    outgoing: true,
    time: '10:05 AM',
  },
  {
    type: 'msg',
    message: 'What kind of projects are you working on?',
    incoming: false,
    outgoing: true,
    time: '10:06 AM',
  },
  {
    type: 'msg',
    message: "I'm working on a new website for my business.",
    incoming: true,
    outgoing: false,
    time: '10:07 AM',
  },
  {
    type: 'msg',
    message: 'That sounds interesting. What kind of business do you have?',
    incoming: false,
    outgoing: true,
    time: '10:08 AM',
  },
  {
    type: 'msg',
    message: 'I run a small marketing agency.',
    incoming: true,
    outgoing: false,
    time: '10:09 AM',
  },
  {
    type: 'msg',
    message: "Oh, that's cool. What kind of marketing do you specialize in?",
    incoming: false,
    outgoing: true,
    time: '10:10 AM',
  },
  {
    type: 'msg',
    message: 'We specialize in social media marketing and SEO.',
    incoming: true,
    outgoing: false,
    time: '10:11 AM',
  },
]
