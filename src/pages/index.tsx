/* eslint-disable @typescript-eslint/no-empty-interface */
import LoginForm from "@/features/login/components/LoginForm";
import OverlayCalling from "@/features/Overlay-Calling/components/OverlayCalling";
import React, { ReactElement, useState } from "react";

interface Props {}

function index({}: Props): ReactElement {
  const [overlayStatus, setOverlayStatus] = useState(true);
  
  return (
    // <div className="{inter.className}">
    <div className="{inter.className}">history</div>
  );
}

export default index;
