import {
  CaretDown,
  MagnifyingGlass,
  PhoneCall,
  VideoCamera,
} from 'phosphor-react'
import React from 'react'
import UserAvator from '../ui/Avator'
import Divider from '../ui/Divider'

const ConversationHeader = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2 bg-[#F8FAFF] p-2 dark:bg-dark">
      <div className="flex flex-grow cursor-pointer items-center gap-2">
        <UserAvator online />

        <div className="w-max">
          <h3>Sanyam Jain</h3>
          <h6> offline</h6>
        </div>
      </div>

      <div className="flex gap-4">
        <MagnifyingGlass size={25} />
        <Divider className="!h-8 w-[1px]" />
        <CaretDown size={25} />
      </div>
    </div>
  )
}

export default ConversationHeader
