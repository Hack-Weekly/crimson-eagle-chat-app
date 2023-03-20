import clsx from 'clsx'
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react'

const ConversationInput = () => {
  return (
    <div className="relative flex w-full items-center justify-center gap-2 bg-light-primary py-4 px-2 dark:bg-dark">
      <div className="flex flex-grow items-center gap-1 rounded-lg dark:bg-dark-secondary">
        {/* Media Button  */}
        <div
          className={clsx('absolute bottom-20 left-3 flex flex-col gap-2')}
        ></div>
        <div className="p-2 hover:bg-slate-400 dark:hover:bg-slate-800">
          <LinkSimple size={20} />
        </div>

        {/* Chat Input */}
        <input
          type="text"
          placeholder="Enter the Meassage..."
          className="scrollbar-thin w-full resize-none bg-transparent p-2 outline-none placeholder:text-black dark:caret-white dark:placeholder:text-white"
        />

        <button className="cursor-pointer p-2 hover:bg-slate-400 dark:hover:bg-slate-800">
          <Smiley size={20} />
        </button>
      </div>

      {/* Send Button */}
      <button className="rounded-lg bg-main-accent p-2">
        <PaperPlaneTilt size={20} />
      </button>
    </div>
  )
}

export default ConversationInput
