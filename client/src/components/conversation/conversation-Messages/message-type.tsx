import clsx from 'clsx'
import { ChatProps } from './messages'

const Timeline = (chat: ChatProps) => {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="h-[1px] w-[46%] rounded-full bg-slate-600" />
      <p>{chat.text}</p>
      <div className="h-[1px] w-[46%] rounded-full bg-slate-600" />
    </div>
  )
}

const TextMessage = (chat: ChatProps) => {
  return (
    <div
      className={clsx(
        chat.incoming === true ? 'justify-start' : 'justify-end',
        'group flex rounded-xl '
      )}
    >
      <p
        className={clsx(
          'flex rounded-xl p-2',
          chat.incoming === true
            ? 'bg-slate-300 dark:text-black'
            : 'bg-main-accent text-white'
        )}
      >
        {chat.message}
      </p>
    </div>
  )
}

export { Timeline, TextMessage }
