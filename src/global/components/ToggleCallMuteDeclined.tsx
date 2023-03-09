import React, { useState } from "react";
import MuteIcon from "@/Model/Svg/Mute.svg";
import UnMuteIcon from "@/Model/Svg/UnMute.svg";
import DeclinedCallIcon from "@/Model/Svg/DeclinedCall.svg";
import ToggleIcon from "@/global/components/ToggleIcon";
import VDOIcon from "@/Model/Svg/VDO.svg";
import UnVDOIcon from "@/Model/Svg/UnVDO.svg";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setOverlayStatus } from "@/stores/slice/overlayStatusSlice";
import { SlCallEnd } from "react-icons/sl";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";

interface Status {
  onClickVDO?: (status: boolean) => void;
}
export default function ToggleCallMuteDeclined(Props: Status) {
  const statusOverlay = useAppSelector((state) => state.overlayStatusSlice);
  const dispatch = useAppDispatch();
  const [onMute, setMute] = useState(false);
  const [onVDO, setVDO] = useState(false);
  return (
    <div className="mb-[4rem] flex justify-center ">
      <div className="flex cursor-pointer items-center justify-center pl-[4rem] ml-3 mr-3">
        <div
          className="flex items-center  justify-center rounded-full bg-zinc-600 text-white xs:text-3xl xs:p-2 sm:text-5xl sm:p-3"
          onClick={() => setMute(!onMute)}
        >
          <ToggleIcon
            onClick={onMute}
            Icon={<BsFillMicFill />}
            IconToggle={<BsFillMicMuteFill />}
          />
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-center rounded-full  bg-red-600 text-white xs:text-3xl xs:h-10 xs:w-10 xs:p-7 sm:text-5xl sm:p-10">
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
      <div className="flex cursor-pointer items-center justify-center pr-[4rem] ml-3 mr-3">
        <div
          className="flex items-center  justify-center rounded-full bg-zinc-600 text-white xs:text-3xl xs:p-2 sm:text-5xl sm:p-3"
          onClick={() => {
            setVDO(!onVDO);
            {
              Props.onClickVDO && Props.onClickVDO!(onVDO);
            }
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
