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
export { default as getServerSideProps } from "@/utils/getServerSideProps";

interface Props {
  user: User;
}

function index(props: Props) {
  const { user } = props;
  const vidoCall = useAppSelector((state) => state.videoCall);
  // const router = useRouter();
  const { data, isLoading, error } = useGetUserQuery(user.firstName!);
  console.log("users", user.firstName);

  return (
    <>
      {vidoCall.calling && !vidoCall.callAccepted ? (
        <VideoChatForm />
      ) : data?.role === "pharmacy" && vidoCall.callAccepted ? (
        <VideoChatForm />
      ) : data?.role === "pharmacy" ? (
        <DoctorChat />
      ) : (
        <UserChat user={user}  />
      )}

      <OverlayCalling />
    </>
  );
}

export default index;
