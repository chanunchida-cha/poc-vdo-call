/* eslint-disable @typescript-eslint/no-empty-interface */
import LoginForm from "@/features/login/components/LoginForm";
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import React, { ReactElement } from "react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Props {}

function index({}: Props): ReactElement {
  return (
    // <div className="{inter.className}">
    <div className="{inter.className}">
      <OverlayCalling status={true} role={"user"} />
      <LoginForm />
    </div>
  );
}

export default index;
