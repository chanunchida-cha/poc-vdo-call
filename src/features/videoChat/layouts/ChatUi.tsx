import React from "react";

type Props = {
  video: React.ReactNode;
  chat: React.ReactNode;
  chatMobile: React.ReactNode;
  onChat: React.ReactNode;
};
function ChatUi({ video, chat, chatMobile, onChat }: Props) {
  return (
    <div className="h-screen w-screen overflow-y-hidden">
      <div className={`${onChat ? null : "hidden"}`}>{chatMobile}</div>
      <div className="h-full w-full flex-row flex-wrap justify-center pt-16 sm:flex ">
        {video}
        {chat}
      </div>
    </div>
  );
}
export default ChatUi;
