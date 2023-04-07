import SearchBar from '@/utils/SearchBar';
import React, { ReactElement, useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";

interface Props {
    children:  React.ReactNode;
}

function ChatLayout({children}: Props): ReactElement {
    const [isChat, setIsChat] = useState(true);


    //children รับมาจากหน้า chatroom & chathistory
    return (
        <div className="flex flex-col h-screen relative">

          
            <div className="flex-1 overflow-hidden lg:p-24 flex flex-row justify-between md:gap-2 lg:gap-10">
                {children}
            </div>
           
               <div className="flex lg:hidden flex-row justify-between items-center px-4 py-2 space-x-4 bg-secondary-light h-14">
                <div className="flex-shrink-0 flex flex-row justify-between items-center space-x-4 w-full">
                    <div className="w-1/2">
                        <button className="w-full h-full flex justify-center items-center rounded-full" onClick={() => setIsChat(true)}>
                            {/* 22 short if เปลี่ยน สี */}
                            <RiMessage2Fill size={20} className={isChat ? "text-secondary" : "text-white"} />
                            <p className={`${isChat ? "text-secondary" : "text-white"} text-sm ml-2`}>Chat</p>
                        </button>
                    </div>
                    <div className="w-1/2">
                        <button className="w-full h-full flex justify-center items-center rounded-full" onClick={() => setIsChat(false)}>
                            <FaPhoneAlt size={20} className={isChat ? "text-white" : "text-secondary"} />
                            <p className={`${isChat ? "text-white" : "text-secondary"} text-sm ml-2`}>Call</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
          
        
    )
}

export default ChatLayout


 {/* chat layout ส่่วนมมือถือ */}