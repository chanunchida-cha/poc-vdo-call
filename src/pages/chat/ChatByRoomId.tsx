import {
  ChatMessageMe,
  ChatMessageOther,
} from "@/features/chat/components/ChatMessage";
import ChatRoom from "@/features/chat/layouts/ChatRoom";
import { User } from "@/models/interface/InterfaceUser";
import { useGetChatLogByRoomIdQuery } from "@/stores/service/getLogChatService";
import React, { ReactElement } from "react";

interface Props {
  roomId: string;
  userLogin: User;
  pharmacyName?: string;
  patientName?: string;
}

function ChatByRoomId({ roomId, userLogin, pharmacyName, patientName }: Props) {
  console.log("room id", roomId);

  const { data, isLoading, error } = useGetChatLogByRoomIdQuery(roomId);
  console.log(data);

  return (
    <ChatRoom title={pharmacyName ? pharmacyName! : patientName!} data={data}>
      {data?.chat?.map((chatLog) => {
        console.log("name", chatLog.name);
        console.log("login", userLogin);

        return (
          <>
            {userLogin.role === "pharmacy" &&
              (userLogin.role === chatLog.role ? (
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
              ))}
            {userLogin.role === "user" &&
              (chatLog.name === userLogin.firstName ? (
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
              ))}
          </>
        );
      })}
    </ChatRoom>
  );
}

export default ChatByRoomId;
