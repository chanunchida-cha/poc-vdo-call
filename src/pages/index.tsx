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
import OverlayUserCalling from "@/features/Overlay-Calling/components/OverlayUserCalling";
interface Props {}

function index({}: Props): ReactElement {
  const router = useRouter();
  const email =
    typeof window !== "undefined" ? sessionStorage.getItem("email") : null;
  useEffect(() => {
    !email && router.push("/login");
  }, [email]);
  const vidoCall = useAppSelector((state) => state.videoCall);
  const firstname =
    typeof window !== "undefined" ? sessionStorage.getItem("firstname") : null;
  const { data, isLoading, error } = useGetUserQuery(firstname!);

  return (
    <>
      {vidoCall.calling && !vidoCall.callAccepted ? (
        <VideoChatForm />
      ) : data?.role === "pharmacy" && vidoCall.callAccepted ? (
        <VideoChatForm />
      ) : (
        <User />
      )}

      <OverlayCalling />
    </>
  );
}

export default index;
