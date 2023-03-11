import React, { ReactElement, useState, useEffect } from "react";
import ChatLayout from "@/features/chat/layouts/ChatLayout";
import ChatHistory from "@/features/chat/layouts/ChatHistory";
import ChatRoom from "@/features/chat/layouts/ChatRoom";
import ChatChannel from "@/features/chat/components/ChatChannel";
import {
  ChatMessageMe,
  ChatMessageOther,
} from "@/features/chat/components/ChatMessage";
import { useGetHistoryByPatientIdQuery } from "@/stores/service/getHistoryService";
import { type User } from "@/models/interface/InterfaceUser";
import ChatByRoomId from "./ChatByRoomId";
interface Props {
  user: User;
}

function UserChat({ user }: Props): ReactElement {
  const [activeChannel, setActiveChannel] = useState(0);

  const { data, isLoading, error } = useGetHistoryByPatientIdQuery(user.id);
  console.log("history", data);


  return (
    <div>
      <ChatLayout>
        <ChatHistory>
      {
       data?.map((history)=>{
        return(
          <ChatChannel
          name={history.pharmacyName}
          avatar={`https://ui-avatars.com/api/?name= ${history.pharmacyName.charAt(0)}`}
          message="ไม่สบายทำดี"
          isActive={activeChannel == 0}
          onClick={() => setActiveChannel(0)}
        />
        )

       })
      }
        </ChatHistory>

       
        <ChatByRoomId/>
       

      
       
      </ChatLayout>
    </div>
  );
}

export default UserChat;
