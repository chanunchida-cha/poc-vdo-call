import React, { useState } from "react";
import MuteIcon from "@/Model/Svg/Mute.svg";
import UnMuteIcon from "@/Model/Svg/UnMute.svg";
import DeclinedCallIcon from "@/Model/Svg/DeclinedCall.svg";
import ToggleIcon from "@/shared-components/components/ToggleIcon";
import VDOIcon from "@/Model/Svg/VDO.svg";
import UnVDOIcon from "@/Model/Svg/UnVDO.svg";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setOverlayStatus } from "@/stores/slice/overlayStatusSlice";
import { SlCallEnd } from "react-icons/sl";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { setOpenUserCamera } from "@/stores/slice/videoCallSlice";
import { stopMediaStream } from "@/stores/slice/media/mediaSlice";

interface Status {}
export default function ToggleCallMuteDeclined(Props: Status) {
  const statusOverlay = useAppSelector((state) => state.overlayStatusSlice);
  const vidoCall = useAppSelector((state) => state.videoCall);
  const dispatch = useAppDispatch();
  const [onMute, setMute] = useState(false);
  const [onVDO, setVDO] = useState(false);
  return (
    <div className="mb-[4rem] flex justify-center ">
      <div className="ml-3 mr-3 flex cursor-pointer items-center justify-center pl-[4rem]">
        <div
          className="flex items-center  justify-center rounded-full bg-zinc-600 text-white xs:p-2 xs:text-3xl sm:p-3 sm:text-5xl"
          onClick={() => setMute(!onMute)}
        >
          <ToggleIcon
            onClick={onMute}
            Icon={<BsFillMicFill />}
            IconToggle={<BsFillMicMuteFill />}
          />
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(stopMediaStream());
        }}
        className="flex cursor-pointer items-center justify-center rounded-full  bg-red-600 text-white xs:h-10 xs:w-10 xs:p-7 xs:text-3xl sm:p-10 sm:text-5xl"
      >
        {statusOverlay ? (
          <div onClick={() => dispatch(setOverlayStatus())}>
            <SlCallEnd className="hover:brightness-[0.75] " />
          </div>
        ) : (
          <div>
            <SlCallEnd className="hover:brightness-[0.75] " />
          </div>
        )}
      </div>
      <div className="ml-3 mr-3 flex cursor-pointer items-center justify-center pr-[4rem]">
        <div
          className="flex items-center  justify-center rounded-full bg-zinc-600 text-white xs:p-2 xs:text-3xl sm:p-3 sm:text-5xl"
          onClick={() => {
            setVDO(!onVDO);
            dispatch(setOpenUserCamera(!vidoCall.openUserCamera));
          }}
        >
          <ToggleIcon
            onClick={onVDO}
            Icon={<IoVideocam />}
            IconToggle={<IoVideocamOff />}
          />
        </div>
      </div>
    </div>
  );
}
