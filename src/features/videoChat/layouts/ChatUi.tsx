import React from "react";

type Props = {
  video: React.ReactNode;
  chat:React.ReactNode;
};
function ChatUi({ video ,chat}: Props) {
  return (
    <div className="h-screen w-screen overflow-y-hidden">
      <div className="sm:flex h-full w-full flex-row justify-center pt-16 flex-wrap ">
        {video}
        {chat}
      </div>
    </div>
  );
}
export default ChatUi;
