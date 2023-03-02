import React, { useState } from "react";
import MuteIcon from "@/Model/Svg/Mute.svg";
import UnMuteIcon from "@/Model/Svg/UnMute.svg";
import DeclinedCallIcon from "@/Model/Svg/DeclinedCall.svg";
import ToggleIcon from "@/global/components/ToggleIcon";
import VDOIcon from "@/Model/Svg/VDO.svg";
import UnVDOIcon from "@/Model/Svg/UnVDO.svg";

interface Props {
  setOverlay?: (status: boolean) => void;
  Overlaystatus?: boolean;
  onClickCamera:(status: boolean) => void;
  openCamera:boolean
}
export default function ToggleCallMuteDeclined({}: Props) {
  const [onMute, setMute] = useState(false);
  const [onVDO, setVDO] = useState(false);
  return (
    <div className="mb-[4rem] grid grid-cols-3 gap-[0rem]">
      <div className="flex cursor-pointer items-center justify-center pl-[4rem]">
        <div onClick={() => setMute(!onMute)}>
          <ToggleIcon
            onClick={onMute}
            Icon={<UnMuteIcon />}
            IconToggle={<MuteIcon />}
          />
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-center">
        <div onClick={() => Props.setOverlay!(!Props.Overlaystatus)}>
          <DeclinedCallIcon className="hover:brightness-[0.75] " />
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-center pr-[4rem]">
        <div onClick={() => setVDO(!onVDO)}>
          <ToggleIcon
            onClick={onVDO}
            Icon={<VDOIcon />}
            IconToggle={<UnVDOIcon />}
          />
        </div>
      </div>
    </div>
  );
}
