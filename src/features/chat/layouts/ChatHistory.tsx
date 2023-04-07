// Path: src\features\chat\layouts\ChatHistory.tsx
import SearchBar from "@/utils/SearchBar";
import React, { ReactElement, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";

interface Props {
  children: React.ReactNode;
}
// chat history ส่วนของ web
function ChatHistory({ children }: Props): ReactElement {
  const [isChat, setIsChat] = useState(true);

  return (
    <div
      className={`
      mt-4 flex h-full max-w-[80px] flex-1 flex-col overflow-hidden bg-white shadow-lg sm:max-w-sm
      lg:mt-0 lg:rounded-[2rem]
    `}
    >
      {/* ส่วนตัวหนังสือ chat */}
      {/*Func SearchBar รับ component มาจาก folder Utils */}
      <div className=" p-4 pb-0">
        <div className="flex flex-col border-b-2 border-primary pb-2 md:flex-row">
          <h1 className="text-md flex flex-1 items-center font-bold text-primary sm:text-xl">
            Chat
          </h1>
          <SearchBar />
        </div>
      </div>

      {/* ส่วนผู้ติดต่อที่เคยแชทด้วย */}
      <div className="-y-auto flex-1 overflow-x-hidden">{children}</div>

      {/* ส่วนไอคอนโทรกับแชท */}
      <div className="hidden h-14 flex-row items-center justify-between space-x-4 bg-secondary-light px-4 py-2 sm:flex">
        <div className="flex w-full flex-shrink-0 flex-row items-center justify-between space-x-4">
          <div className="w-1/2">
            <button
              className="flex h-full w-full items-center justify-center rounded-full"
              onClick={() => setIsChat(true)}
            >
              <RiMessage2Fill
                size={20}
                className={isChat ? "text-secondary" : "text-white"}
              />
              <p
                className={`${
                  isChat ? "text-secondary" : "text-white"
                } ml-2 text-sm`}
              >
                Chat
              </p>
            </button>
          </div>
          <div className="w-1/2">
            <button
              className="flex h-full w-full items-center justify-center rounded-full"
              onClick={() => setIsChat(false)}
            >
              <FaPhoneAlt
                size={20}
                className={isChat ? "text-white" : "text-secondary"}
              />
              <p
                className={`${
                  isChat ? "text-white" : "text-secondary"
                } ml-2 text-sm`}
              >
                Call
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
