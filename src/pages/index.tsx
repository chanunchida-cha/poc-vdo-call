/* eslint-disable @typescript-eslint/no-empty-interface */
import OverlayCalling from "@/features/overlayCalling/components/OverlayCalling";
import { useRouter } from "next/router";
import React, { type ReactElement, useEffect, useRef, useState } from "react";
import VideoChatForm from "@/features/videoChat/components/videoChatForm";
import { useAppSelector } from "@/stores/store";
import { useGetUserQuery } from "@/stores/service/getUserService";
import { type User } from "@/models/interface/InterfaceUser";
import DoctorChat from "./chat/DoctorChat";
import UserChat from "./chat/UserChat";
import VideoChat from "@/features/videoChat/components/videoChatPharmacy/videoChat";
export { default as getServerSideProps } from "@/utils/getServerSideProps";

interface Props {
  user: User;
}

function index(props: Props) {
  const { user } = props;
  const vidoCall = useAppSelector((state) => state.videoCall);
  // const router = useRouter();
  const { data, isLoading, error } = useGetUserQuery(user.firstName!);
  const socket = useAppSelector((state) => state.socketMedia.socket);

  useEffect(() => {
    socket.on("callFail", () => {
      return alert("ไม่มีเภสัชพร้อมให้บริการ กรุณาโทรใหม่อีกครั้ง");
    });
  }, []);

  return (
    <>
      {vidoCall.calling && vidoCall.canCall ? (
        <VideoChatForm user={user} />
      ) : data?.role === "pharmacy" && vidoCall.callAccepted ? (
        <VideoChatForm user={user} />
      ) : data?.role === "pharmacy" ? (
        <DoctorChat user={user} />
      ) : (
        <UserChat user={user} />
      )}

      <OverlayCalling user={user} />
    </>
  );
}

export default index;
