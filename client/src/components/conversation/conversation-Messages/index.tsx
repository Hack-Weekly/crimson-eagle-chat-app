import dynamic from 'next/dynamic'

const Message = dynamic(() => import('./messages'), { ssr: false })

const ConversationMessages = () => {
  return (
    <div className="scrollbarThin flex w-full flex-grow flex-col gap-2 overflow-y-scroll rounded-lg bg-light-secondary p-3 dark:bg-dark-secondary">
      <Message menu />
    </div>
  )
}

export default ConversationMessages
