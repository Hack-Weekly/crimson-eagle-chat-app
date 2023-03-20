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
