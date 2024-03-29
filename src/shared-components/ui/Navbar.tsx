import React, { useEffect, useRef, useState } from "react";
import VoiceCall from "@/models/Svg/VoiceCall.svg";
import VDOCall from "@/models/Svg/VDOCall.svg";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setOverlayStatus } from "@/stores/slice/overlayStatusSlice";
import { useRouter } from "next/router";
import { useGetUserQuery } from "@/stores/service/getUserService";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Cookie from "cookie-universal";
import { io } from "socket.io-client";
import {
  setCallAccepted,
  setCalling,
  setCalls,
} from "@/stores/slice/videoCallSlice";
import Peer from "simple-peer";
import { User } from "@/models/interface/InterfaceUser";
import { startMediaStream } from "@/stores/slice/media/mediaSlice";

interface Status {
  role: "user" | "pharmacy";
}

export default function Navbar(props: Status) {
  const dispatch = useAppDispatch();
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();
  const cookies = Cookie();
  const firstname = cookies.get("firstname");
  const { data, isLoading, error } = useGetUserQuery(firstname!);

  const vidoCall = useAppSelector((state) => state.videoCall);
  const connectionRef: any = useRef(vidoCall.connectionRef);
  const userVideo: any = useRef(vidoCall.userVideo);

  const callUser = () => {
    dispatch(setCalling({ status: true }));
    dispatch(startMediaStream());
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: vidoCall.stream,
    });

    peer.on("signal", (item) => {
      vidoCall.socket.emit("callUser", {
        //userToCall: id,
        signal: item,
        name: firstname,
        user_pk: data?.id,
        to: "",
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    vidoCall.socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const callButton = [
    {
      title: "สนทนาด้วยเสียง",
      icon: <VoiceCall />,
      setOverlay: () => {
        console.log("กด");

        callUser();
      },
    },
    {
      title: "วิดีโอคอล",
      icon: <VDOCall />,
      setOverlay: () => {
        callUser();
      },
    },
  ];

  const logout = () => {
    vidoCall.socket.emit("logout");
    cookies.removeAll();
    router.push("/login");
  };
  console.log("vidoCall.calls", vidoCall.calls);

  return (
    <>
      <div className="border-borderNav fixed z-10 flex h-[3.8rem] w-full flex-row items-center justify-between border-b bg-primary px-2 sm:justify-start">
        {data?.email && (
          <div className="flex h-full  w-full items-center">
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
              <div className="mx-2 flex basis-[15rem] flex-col  ">
                <div className=" flex justify-start pb-[0.3rem] font-semibold text-white">
                  {data.firstName}
                </div>

                {data.role === "pharmacy" && (
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
                        className={`h-[1rem] w-[1rem] rounded-full  ${
                          isOnline
                            ? "ml-[2.5rem] bg-status-online"
                            : "bg-red-600"
                        }  transitio duration-[400ms]`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {data.role === "user" && (
                <div className="flex w-full  flex-row items-center sm:px-5">
                  {callButton.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="mr-2 flex h-[2rem] w-[4rem] cursor-pointer flex-row items-center justify-center rounded-full bg-call-button px-3 text-white sm:w-[11rem]"
                        onClick={callUser}
                      >
                        <div className="mr-3 hidden sm:flex">{item.title}</div>
                        <div>{item.icon}</div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div
                className={`${
                  data.role === "user" ? "basis-[10rem]" : null
                } flex w-full   flex-row items-center justify-end sm:px-5`}
              >
                <div
                  className="mr-2 flex h-[2rem] w-[3rem] flex-row items-center justify-center rounded-full bg-call-button px-3 text-white sm:w-[9rem]"
                  onClick={() => {
                    logout();
                  }}
                >
                  <div className="mr-3 hidden sm:flex">ออกจากระบบ</div>
                  <div>
                    <RiLogoutBoxRLine />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
