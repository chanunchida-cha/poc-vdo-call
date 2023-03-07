/* eslint-disable @typescript-eslint/no-empty-interface */
import LoginForm from "@/features/login/components/LoginForm";
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import VideoChatForm from "@/features/videoChat/components/videoChatForm";
import { setOverlayStatus } from "@/stores/slice/overlayStatusSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import User from "./chat/Doctor";

interface Props {}

function index({}: Props): ReactElement {
  const statusLogin = useAppSelector((state) => state.loginSlice);
  const statusOverlay = useAppSelector((state) => state.overlayStatusSlice);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    if (statusLogin.status === false) {
      router.push("/login");
    }
  }, [statusLogin]);

  return (
    // <div className="{inter.className}">
    // <div className="{inter.className}">history</div>
    // <>{<VideoChatForm />}</>
    <>
      <User />
      <OverlayCalling />
      <label class="flex cursor-pointer select-none items-center">
        <div class="relative">
          <input type="checkbox" class="sr-only" />
          <div class="box block h-8 w-14 rounded-full bg-primary"></div>
          <div class="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"></div>
        </div>
      </label>
    </>
  );
}

export default index;
