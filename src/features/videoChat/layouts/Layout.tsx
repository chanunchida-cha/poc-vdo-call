import ToggleCallMuteDeclined from "@/shared-components/components/ToggleCallMuteDeclined";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

function Layout({}: Props) {
  const [stream, setStream] = useState<MediaStream>();
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const myVideo: any = useRef(null);

  useEffect(() => {
    const stream = async () => {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: openCamera,
        audio: true,
      });
      try {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      } catch (error) {
        console.log(error);
      }
    };
    stream();
  }, [openCamera]);

  return (
    <div className="overflow-y-hidden sm:mx-10 sm:my-5  sm:max-w-full">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="col-span-2 h-screen rounded-xl  bg-bg-close-camera sm:h-[35rem]">
          <div className="relative mr-20 h-full w-full rounded-xl   ">
            <div className="absolute  h-full  w-full rounded-xl">
              {stream && (
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  className="h-full w-full object-cover sm:rounded-xl"
                />
              )}
            </div>
            <div className=" absolute right-0  mt-3 h-[10rem] w-[10rem] px-3  sm:h-[10rem] sm:w-[15rem]">
              <img
                src="https://i.pinimg.com/originals/5a/e9/7f/5ae97f2a2d3b223a6af48d4aca84e6eb.jpg"
                alt="image"
                className="h-full w-full  rounded-xl object-cover drop-shadow-xl"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 m-auto flex  h-20 w-full  items-center justify-center  ">
              <ToggleCallMuteDeclined onClickVDO={setOpenCamera} />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex basis-11/12 rounded-xl bg-blue-500">v</div>
          <div className="mt-3 flex basis-1/12 rounded-xl bg-amber-300">v</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
