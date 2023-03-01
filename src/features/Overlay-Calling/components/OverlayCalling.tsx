import React, { useEffect, useState } from "react";
import DeclinedCall from "@/Model/Svg/DeclinedCall.svg";

import MuteIcon from "@/Model/Svg/Mute.svg";
import UnMuteIcon from "@/Model/Svg/UnMute.svg";
import CallIcon from "@/Model/Svg/Call.svg";
import DeclinedCallIcon from "@/Model/Svg/DeclinedCall.svg";
import ToggleIcon from "@/global/components/ToggleIcon";
import VDOIcon from "@/Model/Svg/VDO.svg";
import UnVDOIcon from "@/Model/Svg/UnVDO.svg";

interface Status {
  Overlaystatus: boolean;
  role: "user" | "pharmacy";
  setOverlay: (status: boolean) => void;
  // setSatus: (status: boolean) => boolean;
}

export default function OverlayCalling(Props: Status) {
  const [onMute, setMute] = useState(false);
  const [onVDO, setVDO] = useState(false);
  const textBtnOnMute = onMute ? "Mute" : "Unmute";
  return (
    <>
      {Props.Overlaystatus && (
        <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-black opacity-[0.87]">
          <div className="grid h-[40rem] w-[25rem] grid-rows-2">
            <div className="mx-auto mt-[4rem]  text-white">
              <div className="text-center  text-4xl font-bold ">Yok Park</div>
              <div className="text-center text-base font-[400]">
                Video call...
              </div>
            </div>
            <div className="mx-auto self-end text-white">
              <div className="mb-[2rem] text-center text-2xl font-[500]">
                Calling...
              </div>
              <div className="mb-[4rem] grid grid-cols-3 gap-[0rem]">
                <div className="flex cursor-pointer items-center justify-center">
                  <div onClick={() => setMute(!onMute)}>
                    <ToggleIcon
                      onClick={onMute}
                      Icon={<UnMuteIcon />}
                      IconToggle={<MuteIcon />}
                    />
                  </div>
                </div>
                <div className="flex cursor-pointer items-center justify-center">
                  <div onClick={() => Props.setOverlay(!Props.Overlaystatus)}>
                    <DeclinedCallIcon className="hover:brightness-[0.75] " />
                  </div>
                </div>
                <div className="flex cursor-pointer items-center justify-center">
                  <div onClick={() => setVDO(!onVDO)}>
                    <ToggleIcon
                      onClick={onVDO}
                      Icon={<VDOIcon />}
                      IconToggle={<UnVDOIcon />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
