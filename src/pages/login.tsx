import LoginForm from "@/features/login/components/LoginForm";
import React, { ReactElement } from "react";

interface Props {}

function login({}: Props): ReactElement {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default login;
