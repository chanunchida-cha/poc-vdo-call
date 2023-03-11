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
            name="Doctor No.1"
            avatar={`https://ui-avatars.com/api/?name= D1`}
            message="ไม่สบายทำดี"
            isActive={activeChannel == 0}
            onClick={() => setActiveChannel(0)}
          />

          <ChatChannel
            name="Doctor No.2"
            avatar={`https://ui-avatars.com/api/?name= D2`}
            message="สวัสดี"
            isActive={activeChannel == 1}
            onClick={() => setActiveChannel(1)}
          />

          <ChatChannel
            name="Doctor No.3"
            avatar={`https://ui-avatars.com/api/?name= D3`}
            message="สวัสดี"
            isActive={activeChannel == 2}
            onClick={() => setActiveChannel(2)}
          />
          <ChatChannel
            name="Doctor No.4"
            avatar={`https://ui-avatars.com/api/?name= D4`}
            message="สวัสดี"
            isActive={activeChannel == 3}
            onClick={() => setActiveChannel(3)}
          />
          <ChatChannel
            name="Doctor No.5"
            avatar={`https://ui-avatars.com/api/?name= D5`}
            message="สวัสดี"
            isActive={activeChannel == 4}
            onClick={() => setActiveChannel(4)}
          />
          <ChatChannel
            name="Doctor No.6"
            avatar={`https://ui-avatars.com/api/?name= D6`}
            message="สวัสดี"
            isActive={activeChannel == 5}
            onClick={() => setActiveChannel(5)}
          />
        </ChatHistory>

        {activeChannel === 0 && (
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
            <ChatMessageMe
              name="Jacket"
              avatar={`https://ui-avatars.com/api/?name= Jacket2`}
              message="ขอบคุณ"
            />
            <ChatMessageMe
              name="Jacket"
              avatar={`https://ui-avatars.com/api/?name= Jacket2`}
              message="แต่ไม่ต้องก็ได้"
            />
          </ChatRoom>
        )}

        {activeChannel === 1 && (
          <ChatRoom title="Doctor No.2">
            <ChatMessageMe
              name="Champ"
              avatar={`https://ui-avatars.com/api/?name= Champ`}
              message="สวัสดี2"
            />
            <ChatMessageOther
              name="Champ"
              avatar={`https://ui-avatars.com/api/?name=D2`}
              message="หวัดดีคนไข้"
            />
          </ChatRoom>
        )}

        {activeChannel === 2 && (
          <ChatRoom title="Doctor No.3">
            <ChatMessageMe
              name="Junior"
              avatar={`https://ui-avatars.com/api/?name= Junior`}
              message="สวัสดี2"
            />
            <ChatMessageOther
              name="Champ"
              avatar={`https://ui-avatars.com/api/?name=D3`}
              message="หวัดดีคนไข้"
            />
          </ChatRoom>
        )}

        {activeChannel === 3 && (
          <ChatRoom title="Doctor No.4">
            <ChatMessageMe
              name="Atom"
              avatar={`https://ui-avatars.com/api/?name= Atom`}
              message="สวัสดี2"
            />
            <ChatMessageOther
              name="Champ"
              avatar={`https://ui-avatars.com/api/?name=D4`}
              message="หวัดดีคนไข้"
            />
          </ChatRoom>
        )}

        {activeChannel === 4 && (
          <ChatRoom title="Doctor No.5">
            <ChatMessageMe
              name="Sorn"
              avatar={`https://ui-avatars.com/api/?name= Sorn`}
              message="สวัสดี2"
            />
            <ChatMessageOther
              name="Champ"
              avatar={`https://ui-avatars.com/api/?name=D5`}
              message="หวัดดีคนไข้"
            />
          </ChatRoom>
        )}

        {activeChannel === 5 && (
          <ChatRoom title="Doctor No.6">
            <ChatMessageMe
              name="Petch"
              avatar={`https://ui-avatars.com/api/?name= Petch`}
              message="สวัสดี2"
            />
            <ChatMessageOther
              name="Champ"
              avatar={`https://ui-avatars.com/api/?name=D6`}
              message="หวัดดีคนไข้"
            />
          </ChatRoom>
        )}
      </ChatLayout>
    </div>
  );
}

export default User;
