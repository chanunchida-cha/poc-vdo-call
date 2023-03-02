/* eslint-disable @typescript-eslint/no-empty-interface */
import LoginForm from "@/features/login/components/LoginForm";
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import VideoChatForm from "@/features/videoChat/components/videoChatForm";
import { useAppSelector } from "@/stores/store";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

interface Props {}

function index({}: Props): ReactElement {
  const statusLogin = useAppSelector((state) => state.statusLogin);
  const router = useRouter();

  useEffect(() => {
    if (statusLogin === false) {
      router.push("/login");
    }
  }, [statusLogin]);

  const [overlayStatus, setOverlayStatus] = useState(true);
  return (
    // <div className="{inter.className}">
    // <div className="{inter.className}">history</div>
    <VideoChatForm/>
  );
}

export default index;
