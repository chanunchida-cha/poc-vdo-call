// Path: src\features\chat\layouts\ChatHistory.tsx
import React, { ReactElement, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";

interface Props {
  children: React.ReactNode
}
// chat history ส่วนของ web
function ChatHistory({ children }: Props): ReactElement {
  const [isChat, setIsChat] = useState(true);

  return (
   
    
    <div className={`
      flex-1 h-full overflow-hidden mt-14 lg:mt-0 flex flex-col bg-white lg:rounded-[2rem] shadow-lg
      max-w-[80px] sm:max-w-sm
    `}>

      {/* ส่วนตัวหนังสือ chat */}
      <div className="p-4 pb-0">
        <div className="border-b-2 border-primary pb-2">
          <h1 className="text-md sm:text-xl font-bold text-primary">Chat</h1>
        </div>
      </div>

      {/* ส่วนผู้ติดต่อที่เคยแชทด้วย */}
      <div className="flex-1 -y-auto overflow-x-hidden">
        {children}
      </div>

      {/* ส่วนไอคอนโทรกับแชท */}
      <div className="hidden sm:flex flex-row justify-between items-center px-4 py-2 space-x-4 bg-secondary-light h-14">
        <div className="flex-shrink-0 flex flex-row justify-between items-center space-x-4 w-full">
          <div className="w-1/2">
            <button className="w-full h-full flex justify-center items-center rounded-full" onClick={() => setIsChat(true)}>
              <RiMessage2Fill size={20} className={isChat ? "text-secondary" : "text-white"} />
              <p className={`${isChat ? "text-secondary" : "text-white"} text-sm ml-2`}>Chat</p>
            </button>
          </div>
          <div className="w-1/2">
           <button  className="w-full h-full flex justify-center items-center rounded-full" onClick={() => setIsChat(false)}>
              <FaPhoneAlt size={20} className={isChat ? "text-white" : "text-secondary"} />
              <p className={`${isChat ? "text-white" : "text-secondary"} text-sm ml-2`}>Call</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
