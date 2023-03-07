import React, { useState } from "react";
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
  const [isOnline, setIsOnline] = useState(true);
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
            <div className="mx-2 flex basis-[20rem] flex-col  ">
              <div className=" flex justify-start pb-[0.3rem] font-semibold text-white">
                ธีรพัฒน์ หงส์วรพิพัฒน์
              </div>

              {Props.role === "pharmacy" && (
                <div className="flex">
                  <div
                    className=" relative flex h-[1rem] w-[3.5rem]  cursor-pointer items-center rounded-full bg-white"
                    onClick={() => setIsOnline(!isOnline)}
                  >
                    <div
                      className={`${
                        isOnline
                          ? "left-[0.2rem] text-[#264E35]"
                          : "left-[1.3rem] text-red-700"
                      } transitio absolute -top-[0.1rem] text-[12px] font-semibold duration-[400ms] `}
                    >
                      {isOnline ? "Online" : "Busy"}
                    </div>

                    <div
                      className={`h-[1rem] w-[1rem] rounded-full bg-status-online ${
                        isOnline ? "ml-[2.5rem]" : "bg-red-600"
                      }  transitio duration-[400ms]`}
                    ></div>
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
