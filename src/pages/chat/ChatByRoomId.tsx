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
  phamacyName?: string;
  patientName?: string;
}

function ChatByRoomId({ roomId, userLogin, phamacyName, patientName }: Props) {
  const { data, isLoading, error } = useGetChatLogByRoomIdQuery(roomId);
  console.log(data);

  return (
    <ChatRoom title={phamacyName ? phamacyName! : patientName!} data={data}>
      {data?.chat.map((chatLog) => {
        return (
          <>
            {chatLog.name === userLogin ? (
              <ChatMessageMe
                name={chatLog.name}
                avatar={`https://ui-avatars.com/api/?name= ${chatLog.name}`}
                message={chatLog.text}
              />
            ) : (
              <ChatMessageOther
                name={chatLog.name}
                avatar={`https://ui-avatars.com/api/?name= ${chatLog.name}`}
                message={chatLog.text}
              />
            )}
          </>
        );
      })}
    </ChatRoom>
  );
}

export default ChatByRoomId;
