import ConversationHeader from './ConversationHeader'
import ConversationMessages from './conversation-Messages'
import ConversationInput from './conversation-input'

const Conversation = () => {
  return (
    <div className="h-scrren flex flex-grow flex-col dark:bg-dark">
      <ConversationHeader />
      <ConversationMessages />
      <ConversationInput />
    </div>
  )
}

export default Conversation
