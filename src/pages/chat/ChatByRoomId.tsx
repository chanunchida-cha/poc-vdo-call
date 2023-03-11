import { ChatMessageMe, ChatMessageOther } from '@/features/chat/components/ChatMessage'
import ChatRoom from '@/features/chat/layouts/ChatRoom'
import React, { ReactElement } from 'react'

interface Props {
    
}

function ChatByRoomId({}: Props): ReactElement {
    return (
        <ChatRoom title="Doctor No.1">
        <ChatMessageMe
          name="Jacket"
          avatar={`https://ui-avatars.com/api/?name= Jacket2`}
          message="ไม่สบายทำไงดี"
        />
        <ChatMessageOther
          name="Doctor No.1"
          avatar={`https://ui-avatars.com/api/?name=D1`}
          message="ทำใจ"
        />
        
      </ChatRoom>
    )
}

export default ChatByRoomId
