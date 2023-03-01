import LoginForm from "@/features/login/components/LoginForm";
import VideoChatForm from "@/features/videoChat/components/videoChatForm";
import ChatUi from "@/features/videoChat/layouts/ChatUi";
import React, { ReactElement } from "react";

interface Props {}

function index({}: Props): ReactElement {
  return (
    <div>
      {/* <LoginForm /> */}
      <ChatUi />
    </div>
  );
}

export default index;
