/* eslint-disable @typescript-eslint/no-empty-interface */
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import User from "./chat/Doctor";
import { io } from "socket.io-client";
import { useAppDispatch } from "@/stores/store";
import { setMe, setStream } from "@/stores/slice/videoCallSlice";
import VideoChatForm from "@/features/videoChat/components/videoChatForm";
import VideoChatPharmacy from "@/features/videoChat/components/videoChatPharmacy/videoChatPharmacy";
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
      <User />/
      <OverlayCalling />
      {/* <VideoChatForm /> */}
      {/* <VideoChatPharmacy/> */}
    </>
  );
}

export default index;
