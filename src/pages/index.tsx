/* eslint-disable @typescript-eslint/no-empty-interface */
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import User from "./chat/Doctor";
import { io } from "socket.io-client";
interface Props {}

function index({}: Props): ReactElement {


  const router = useRouter();
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      router.push("/login");
    }
  });

  
  return (
    <>
      <User />
      <OverlayCalling />
    </>
  );
}

export default index;
