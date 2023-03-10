/* eslint-disable @typescript-eslint/no-empty-interface */
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import User from "./chat/Doctor";
import VideoChatForm from "@/features/videoChat/components/videoChatForm";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useGetUserQuery } from "@/stores/service/getUserService";
import { io } from "socket.io-client";
import { setCalls, setMe, setStream } from "@/stores/slice/videoCallSlice";
interface Props {}

function index({}: Props): ReactElement {
  const router = useRouter();
  const email =
    typeof window !== "undefined" ? sessionStorage.getItem("email") : null;
  useEffect(() => {
    !email && router.push("/login");
  }, [email]);

  //----------------------------------------------
  const dispatch = useAppDispatch();
  const vidoCall = useAppSelector((state) => state.videoCall);

  const firstname =
    typeof window !== "undefined" ? sessionStorage.getItem("firstname") : null;
  const { data, isLoading, error } = useGetUserQuery(firstname!);
  const socket = io(`${process.env.NEXT_PUBLIC_SERVER}/chat_test`);

  

  return (
    <>
      {/* {
        vidoCall.callAccepted && !vidoCall.callEnded ? <VideoChatForm/> : <User/>
      } */}
      <OverlayCalling />
      <VideoChatForm/>
      
    </>
  );
}

export default index;
