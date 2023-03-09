/* eslint-disable @typescript-eslint/no-empty-interface */
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import User from "./chat/Doctor";
import { io } from "socket.io-client";
interface Props {}

function index({}: Props): ReactElement {
  const router = useRouter();
  const email =
    typeof window !== "undefined" ? sessionStorage.getItem("email") : null;
  useEffect(() => {
    !email && router.push("/login");
  }, [email]);

  return (
    <>
      <User />
      <OverlayCalling />
    </>
  );
}

export default index;
