import React from "react";
import VoiceCall from "@/Model/Svg/VoiceCall.svg";
import VDOCall from "@/Model/Svg/VDOCall.svg";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setOverlayStatus } from "@/stores/slice/overlayStatusSlice";
import { callUser } from "@/stores/slice/videoCallSlice";
interface Status {
  role: "user" | "pharmacy";
}

export default function Navbar(Props: Status) {
  const statusOverlay = useAppSelector((state) => state.overlayStatusSlice);
  const dispatch = useAppDispatch();

  const callButton = [
    {
      title: "สนทนาด้วยเสียง",
      icon: <VoiceCall />,
      setOverlay: () => {
        console.log("Click Voice call");
        return dispatch(callUser);
      },
    },
    {
      title: "วิดีโอคอล",
      icon: <VDOCall />,
      setOverlay: () => {
        console.log("Click Vdo call");
        return dispatch(setOverlayStatus());
      },
    },
  ];
  return (
    <>
     <div className="border-borderNav fixed z-10 flex h-[3.8rem] w-full flex-row items-center justify-between border-b bg-primary px-2 sm:justify-start">
        <div className="flex  h-full items-center">
          <div className="flex w-full flex-row items-center">
            <div className="basis-[2.5rem]">
              <div className="mx-2 flex h-[2.5rem] w-[2.5rem]  items-center overflow-hidden rounded-full">
                <img
                  src={
                    "https://i.pinimg.com/originals/13/3c/2f/133c2f8e94d5b16f31a4d89ac0d177eb.jpg"
                  }
                  alt="profile"
                  className="h-full w-full object-cover "
                />
              </div>
            </div>
            <div className="basis-[20rem] mx-2 flex flex-col  ">
              <div className=" flex justify-start pb-[0.3rem] font-semibold text-white">
              ธีรพัฒน์ หงส์วรพิพัฒน์
              </div>

              {Props.role === "pharmacy" && (
                <div className="flex">
                  <div className=" flex h-[1rem] w-[4rem]  items-center justify-between  rounded-full bg-white px-2 ">
                    <div className="text-[0.8rem] text-primary">online</div>
                    <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-status-online"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex w-full flex-row items-center justify-end sm:px-5">
              {callButton.map((item) => {
                return (
                  <div
                    className="mr-2 flex h-[2rem] w-[4rem] flex-row items-center justify-center rounded-full bg-call-button px-3 text-white sm:w-[11rem]"
                    onClick={item.setOverlay}
                  >
                    <div className="mr-3 hidden sm:flex">{item.title}</div>
                    <div>{item.icon}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
