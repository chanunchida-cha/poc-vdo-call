import React, { useRef, useState } from "react";
import MuteIcon from "@/Model/Svg/Mute.svg";
import UnMuteIcon from "@/Model/Svg/UnMute.svg";
import DeclinedCallIcon from "@/Model/Svg/DeclinedCall.svg";
import ToggleIcon from "@/shared-components/components/ToggleIcon";
import VDOIcon from "@/Model/Svg/VDO.svg";
import UnVDOIcon from "@/Model/Svg/UnVDO.svg";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setOverlayStatus } from "@/stores/slice/overlayStatusSlice";
import { SlCallEnd, SlCallIn } from "react-icons/sl";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";

import Peer from "simple-peer";
import { useGetUserQuery } from "@/stores/service/getUserService";
import { acceptCall } from "@/stores/slice/media/socketMediaSlice";

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
  user_pk: string;
}
interface Props {
  onClickVDO?: (status: boolean) => void;
  user: User;

  call: Call;
}
import { User } from "@/models/interface/InterfaceUser";

export { default as getServerSideProps } from "@/utils/getServerSideProps";

export default function ToggleButtonPharmacy({ call, user }: Props) {
  const dispatch = useAppDispatch();
  const statusOverlay = useAppSelector((state) => state.overlayStatusSlice);

  const [onMute, setMute] = useState(false);
  const [onVDO, setVDO] = useState(false);

  return (
    <div className=" flex justify-center items-center ">
      <div className="mx-2   flex h-[2rem] w-[2rem] sm:h-[4rem] sm:w-[4rem] cursor-pointer items-center justify-center  rounded-full bg-primary-light  text-[1rem] sm:text-[2rem] text-white  ">
        <div
          onClick={() => {
            dispatch(acceptCall({ call: call, user: user }));
          }}
        >
          <SlCallIn className="hover:brightness-[0.75] " />
        </div>
      </div>
      <div className="mx-2   flex h-[2rem] w-[2rem] sm:h-[4rem] sm:w-[4rem] cursor-pointer items-center justify-center  rounded-full bg-red-700  text-[1rem] sm:text-[2rem] text-white  ">
        <div 
        onClick={() => dispatch(setOverlayStatus())}
        
        >
          <SlCallEnd className="hover:brightness-[0.75] " />
        </div>
      </div>
    </div>
  );
}
