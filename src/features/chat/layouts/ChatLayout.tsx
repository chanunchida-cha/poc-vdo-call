import SearchBar from "@/utils/SearchBar";
import SearchBarMobile from "@/utils/searchBarMobile";
import React, { ReactElement, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";

interface Props {
  children: React.ReactNode;
}

function ChatLayout({ children }: Props): ReactElement {
  const [isChat, setIsChat] = useState(true);

  //children รับมาจากหน้า chatroom & chathistory
  return (
    <div className="relative flex h-screen flex-col">
      <div className="flex flex-1 flex-col overflow-hidden px-2 pt-20  md:gap-2 lg:gap-4   lg:py-20 lg:px-20  ">
        <SearchBarMobile />
        <div className=" flex flex-1 justify-between  overflow-hidden md:gap-2 lg:gap-4  lg:p-4 ">
          {children}
        </div>
      </div>

      <div className="flex h-14 flex-row items-center justify-between space-x-4 bg-secondary-light px-4 py-2 lg:hidden">
        <div className="flex w-full flex-shrink-0 flex-row items-center justify-between space-x-4">
          <div className="w-1/2">
            <button
              className="flex h-full w-full items-center justify-center rounded-full"
              onClick={() => setIsChat(true)}
            >
              {/* 22 short if เปลี่ยน สี */}
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

export default ChatLayout;

{
  /* chat layout ส่่วนมมือถือ */
}
