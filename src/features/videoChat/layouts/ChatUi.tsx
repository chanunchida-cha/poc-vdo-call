import React from "react";

type Props = {
  video: React.ReactNode;
  chat:React.ReactNode;
};
function ChatUi({ video ,chat}: Props) {
  return (
    <div className="h-screen w-screen ">
      <div className="flex h-full w-full flex-row justify-center pt-6 flex-wrap ">
        {video}
        {chat}
      </div>
    </div>
  );
}
export default ChatUi;
