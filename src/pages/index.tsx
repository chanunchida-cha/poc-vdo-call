import LoginForm from "@/features/login/components/LoginForm";
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
