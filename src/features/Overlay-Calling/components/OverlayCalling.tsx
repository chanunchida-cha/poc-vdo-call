import React from "react";
import DeclinedCall from "@/Model/Svg/DeclinedCall.svg";

import MuteIcon from "@/Model/Svg/Mute.svg";
import UnMuteIcon from "@/Model/Svg/UnMute.svg";
import CallIcon from "@/Model/Svg/Call.svg";
import DeclinedCallIcon from "@/Model/Svg/DeclinedCall.svg";
import ToggleIcon from "@/global/components/ToggleIcon";

interface Status {
  status: boolean;
  role: "user" | "pharmacy";
  // setSatus: (status: boolean) => boolean;
}

export default function OverlayCalling(Props: Status) {
  return (
    <>
      {Props.status && (
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
              <div className="mb-[4rem] grid grid-cols-2 gap-[4rem]">
                <ToggleIcon
                  onClick={false}
                  Text={"Mute"}
                  Icon={<UnMuteIcon />}
                  IconToggle={<MuteIcon />}
                />
                <div className="cursor-pointer">
                  <ToggleIcon
                    onClick={false}
                    Text={"Declined"}
                    Icon={<CallIcon />}
                    IconToggle={<DeclinedCallIcon />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
