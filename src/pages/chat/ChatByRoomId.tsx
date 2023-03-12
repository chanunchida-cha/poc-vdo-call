import {
  ChatMessageMe,
  ChatMessageOther,
} from "@/features/chat/components/ChatMessage";
import ChatRoom from "@/features/chat/layouts/ChatRoom";
import { useGetChatLogByRoomIdQuery } from "@/stores/service/getLogChatService";
import React, { ReactElement } from "react";

interface Props {
  roomId: string;
  userLogin: string;
}

function ChatByRoomId({ roomId }: Props) {
  const { data, isLoading, error } = useGetChatLogByRoomIdQuery(roomId);
  console.log(data);

  return (
    <ChatRoom title="Doctor No.1">
      {data?.chat.map((chatLog) => {
        return (
          <>
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
          </>
        );
      })}
    </ChatRoom>
  );
}

export default ChatByRoomId;
