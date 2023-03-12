import ToggleButtonPharmacy from "@/shared-components/components/ToggleButtonPharmacy";
import ToggleCallMuteDeclined from "@/shared-components/components/ToggleCallMuteDeclined";
import { useGetUserQuery } from "@/stores/service/getUserService";
import { setCallAccepted } from "@/stores/slice/videoCallSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useRef } from "react";
import Peer from "simple-peer";

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

export default function OverlayCalling() {
  const vidoCall = useAppSelector((state) => state.videoCall);
  const dispatch = useAppDispatch();
  const firstname =
    typeof window !== "undefined" ? sessionStorage.getItem("firstname") : null;

  return (
    <>
      {vidoCall.calls.map((call: Call) => {
        console.log(call);

        return (
          <div key={call.from}>
            {call.isReceivingCall && !vidoCall.callAccepted && (
              <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black opacity-[0.87]">
                <div className="grid h-[40rem] w-[25rem] grid-rows-2">
                  <div className="mx-auto mt-[4rem]  text-white">
                    <div className="text-center  text-4xl font-bold xs:pt-16 sm:pt-0">
                      {call.name}
                    </div>
                    <div className="text-center text-base font-[400]">
                      Video call...
                    </div>
                  </div>
                  <div className="mx-auto self-end text-white">
                    <div className="mb-[7rem] text-center text-2xl font-[500]">
                      Calling...
                    </div>
                  </div>
                  <ToggleButtonPharmacy />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
