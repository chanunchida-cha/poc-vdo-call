/* eslint-disable @typescript-eslint/no-empty-interface */
import LoginForm from "@/features/login/components/LoginForm";
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import React, { ReactElement, useState } from "react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Props {}

function index({}: Props): ReactElement {
  const [overlayStatus, setOverlayStatus] = useState(false);
  return (
    // <div className="{inter.className}">
    <div className="{inter.className}">
      <OverlayCalling
        Overlaystatus={overlayStatus}
        role={"user"}
        setOverlay={setOverlayStatus}
      />
      <LoginForm />
    </div>
  );
}

export default index;
