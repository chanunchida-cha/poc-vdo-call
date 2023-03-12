import { Chat, ChatHistory } from "@/models/interface/interfaceChatHistory";
import React, { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
  title: string;
  data: ChatHistory | undefined;
}

function ChatRoom({ children, title, data }: Props) {
  console.log(data);

  if (data === null) {
    return (
      <div className="mt-14 p-4 flex h-full flex-1 flex-col overflow-hidden bg-white shadow-lg lg:mt-0 lg:rounded-[2rem] ">
        ** ยังไม่มีประวัติการสนทนา **
      </div>
    );
  } else {
    return (
      <div className="mt-14 flex h-full flex-1 flex-col overflow-hidden bg-white shadow-lg lg:mt-0 lg:rounded-[2rem] ">
        <div className="p-4 pb-0">
          <div className="border-b-2 border-primary pb-2">
            <h1 className="text-md font-bold text-primary sm:text-xl">
              {title}
            </h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    );
  }
}

export default ChatRoom;
