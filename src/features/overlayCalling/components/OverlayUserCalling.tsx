import ToggleButtonPharmacy from "@/global/components/ToggleButtonPharmacy";
import ToggleCallMuteDeclined from "@/global/components/ToggleCallMuteDeclined";
import { setMe, setOpenUserCamera, setStream } from "@/stores/slice/videoCallSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useEffect, useRef, useState } from "react";

export default function OverlayUserCalling() {
  const dispatch = useAppDispatch();
  const vidoCall = useAppSelector((state) => state.videoCall);

  const myVideoRef: any = useRef(vidoCall.myVideo);
  async function liveSteam() {
    const currentStream = await navigator.mediaDevices.getUserMedia({
      video: vidoCall.openUserCamera,
      audio: true,
    });

    try {
      dispatch(setStream(currentStream));
      myVideoRef.current.srcObject = currentStream;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    liveSteam();
    vidoCall.socket.on("me", (id) => {
      dispatch(setMe(id));
    });

    vidoCall.socket.on("callTimeout", ({ message }) => {
      console.log(message);
    });
  },[vidoCall.openUserCamera,vidoCall.calling]);
  console.log("calling", vidoCall.stream);

  console.log(vidoCall.openUserCamera);
  

  return (
    <>
      return (
      {vidoCall.calling && !vidoCall.callAccepted && (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black opacity-[0.90]">
          <div className="grid h-[40rem] w-[25rem] grid-rows-2">
            <div className="mx-auto mt-[4rem] h-[30rem] w-[30rem]  text-white">
              {vidoCall.stream && (
                <video
                  playsInline
                  muted
                  ref={myVideoRef}
                  autoPlay
                  className=" h-screen w-full bg-bg-close-camera object-cover  drop-shadow-xl lg:h-5/6 lg:rounded-3xl"
                />
              )}
            </div>
            <div className="mx-auto self-end text-white">
              <div className="mb-[7rem] text-center text-2xl font-[500]">
                Calling...
              </div>
            </div>
            <ToggleCallMuteDeclined />
          </div>
        </div>
      )}
      );
    </>
  );
}
