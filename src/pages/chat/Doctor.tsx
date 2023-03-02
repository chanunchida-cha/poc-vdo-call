import React, { ReactElement, useState, useEffect } from "react";
import ChatLayout from "@/features/chat/layouts/ChatLayout";
import ChatHistory from "@/features/chat/layouts/ChatHistory";
import ChatRoom from "@/features/chat/layouts/ChatRoom";
import ChatChannel from "@/features/chat/components/ChatChannel";
import {
  ChatMessageMe,
  ChatMessageOther,
} from "@/features/chat/components/ChatMessage";

interface Props {}

function User({}: Props): ReactElement {
  const [allChannels, setAllChannels] = useState(null);
  const [activeChannel, setActiveChannel] = useState(0);

  return (
    <div>
      <ChatLayout>
        <ChatHistory>
          <ChatChannel
            name="Jacky"
            avatar={`https://ui-avatars.com/api/?name= JA`}
            message="ไม่สบายทำดี"
            isActive={activeChannel == 0}
            onClick={() => setActiveChannel(0)}
          />

          <ChatChannel
            name="Champ"
            avatar={`https://ui-avatars.com/api/?name= CH`}
            message="สวัสดี"
            isActive={activeChannel == 1}
            onClick={() => setActiveChannel(1)}
          />

          <ChatChannel
            name="Junior"
            avatar={`https://ui-avatars.com/api/?name= JU`}
            message="สวัสดี"
            isActive={activeChannel == 2}
            onClick={() => setActiveChannel(2)}
          />
          <ChatChannel
            name="Atom"
            avatar={`https://ui-avatars.com/api/?name= AT`}
            message="สวัสดี"
            isActive={activeChannel == 3}
            onClick={() => setActiveChannel(3)}
          />
          <ChatChannel
            name="Sorn"
            avatar={`https://ui-avatars.com/api/?name= SO`}
            message="สวัสดี"
            isActive={activeChannel == 4}
            onClick={() => setActiveChannel(4)}
          />
          <ChatChannel
            name="Petch"
            avatar={`https://ui-avatars.com/api/?name= PE`}
            message="สวัสดี"
            isActive={activeChannel == 5}
            onClick={() => setActiveChannel(5)}
          />
        </ChatHistory>

        {activeChannel === 0 && (
          <ChatRoom title="Jacky">
         
            <ChatMessageOther
              name="Jackey"
              avatar={`https://ui-avatars.com/api/?name=JA`}
              message="ไม่สบายทำไงดี"
            />
               <ChatMessageMe
              name="Doctor"
              avatar={`https://ui-avatars.com/api/?name= DA`}
              message="ทำใจ"
            />
            <ChatMessageOther
              name="Jackey"
              avatar={`https://ui-avatars.com/api/?name=JA`}
              message="ขอบคุณ"
            />
            <ChatMessageOther
              name="Jackey"
              avatar={`https://ui-avatars.com/api/?name=JA`}
              message="แต่ไม่ต้องก็ได้"
            />
          </ChatRoom>
        )}

        {activeChannel === 1 && (
          <ChatRoom title="Champ">
           
            <ChatMessageOther
              name="Champ"
              avatar={`https://ui-avatars.com/api/?name=CH`}
              message="สวัสดี"
            />
             <ChatMessageMe
              name="Doctor"
              avatar={`https://ui-avatars.com/api/?name= DA`}
              message="หวัดดีคนไข้"
            />
          </ChatRoom>
        )}

        {activeChannel === 2 && (
           <ChatRoom title="Junior">
           
           <ChatMessageOther
             name="Junior"
             avatar={`https://ui-avatars.com/api/?name=JU`}
             message="สวัสดี"
           />
            <ChatMessageMe
             name="Doctor"
             avatar={`https://ui-avatars.com/api/?name= DA`}
             message="หวัดดีคนไข้"
           />
         </ChatRoom>
        )}

        {activeChannel === 3 && (
          <ChatRoom title="Atom">
           
          <ChatMessageOther
            name="Atom"
            avatar={`https://ui-avatars.com/api/?name=AT`}
            message="สวัสดี"
          />
           <ChatMessageMe
            name="Doctor"
            avatar={`https://ui-avatars.com/api/?name= DA`}
            message="หวัดดีคนไข้"
          />
        </ChatRoom>
        )}

        {activeChannel === 4 && (
         <ChatRoom title="Sorn">
           
         <ChatMessageOther
           name="Sorn"
           avatar={`https://ui-avatars.com/api/?name=SO`}
           message="สวัสดี"
         />
          <ChatMessageMe
           name="Doctor"
           avatar={`https://ui-avatars.com/api/?name= DA`}
           message="หวัดดีคนไข้"
         />
       </ChatRoom>
        )}

        {activeChannel === 5 && (
          <ChatRoom title="Petch">
           
          <ChatMessageOther
            name="Sorn"
            avatar={`https://ui-avatars.com/api/?name=PE`}
            message="สวัสดี"
          />
           <ChatMessageMe
            name="Doctor"
            avatar={`https://ui-avatars.com/api/?name= DA`}
            message="หวัดดีคนไข้"
          />
        </ChatRoom>
        )}
      </ChatLayout>
    </div>
  );
}

export default User;