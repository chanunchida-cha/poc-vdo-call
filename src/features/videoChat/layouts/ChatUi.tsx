import React from "react";

type Props = {
  video: React.ReactNode;
  chat:React.ReactNode;
};
function ChatUi({ video ,chat}: Props) {
  return (
    <div className="h-screen w-screen ">
      <div className="flex h-full w-screen flex-row justify-center pt-6  ">
        {video}
        {chat}
      </div>
    </div>
  );
}
export default ChatUi;
