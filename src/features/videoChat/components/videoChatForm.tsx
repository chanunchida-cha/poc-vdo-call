import React, { FormEvent, useEffect, useRef, useState } from "react";
import ChatUi from "../layouts/ChatUi";
import ToggleCallMuteDeclined from "@/shared-components/components/ToggleCallMuteDeclined";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { startMediaStream } from "@/stores/slice/media/mediaSlice";
import {
  callToDoctor,
  getNotification,
} from "@/stores/slice/media/socketMediaSlice";
import { User } from "@/models/interface/InterfaceUser";
import { setCalls } from "@/stores/slice/videoCallSlice";
export { default as getServerSideProps } from "@/utils/getServerSideProps";

type Props = {
  user: User;
};

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}
function VideoChatForm({ user }: Props) {
  const dispatch = useAppDispatch();
  const mediaStream = useAppSelector((state) => state.mediaStream);
  const yourStream = useAppSelector((state) => state.socketMedia.yourStream);
  const myVideoRef: any = useRef(null);
  const yourVideoRef: any = useRef(null);
  const vidoCall = useAppSelector((state) => state.videoCall);
  const [text, setText] = useState("");
  const socket = useAppSelector((state) => state.socketMedia.socket);
  const [chat, setChat] = useState<
    { user_pk: string; name: string; message: string }[]
  >([]);

  useEffect(() => {
    if (mediaStream) {
      myVideoRef.current.srcObject = mediaStream;
      dispatch(callToDoctor(user!));
      dispatch(getNotification());
    }
  }, [mediaStream]);

  useEffect(() => {
    if (yourStream) {
      yourVideoRef.current.srcObject = yourStream;
    }
    console.log("yourStream", yourStream);
  });

  const sendChat = () => {
    socket.emit("sendChat", {
      user_pk: user?.id!,
      name: user?.firstName!,
      message: text,
    });
    setText("");
  };

  socket.on("sendChat", (data) => {
    console.log(data);
    setChat([...chat, data]);
  });

  console.log("chat", chat);

  return (
    <>
      <ChatUi
        video={
          <div className="relative h-screen flex-1 basis-1/2  rounded-2xl  lg:mx-4 lg:my-4   ">
            <div className="absolute  h-3/4 w-full md:h-full">
              {/* <div className=" h-screen w-full bg-black object-cover  drop-shadow-xl md:rounded-3xl lg:h-5/6 "></div> */}
              {mediaStream && (
                <video
                  playsInline
                  muted
                  ref={myVideoRef}
                  autoPlay
                  className=" h-screen w-full bg-black object-cover  drop-shadow-xl lg:h-5/6 lg:rounded-3xl"
                />
              )}

              {/* <div className=" h-full w-full bg-black  object-cover drop-shadow-xl md:rounded-3xl "></div> */}
            </div>

            {vidoCall.callAccepted && (
              <video
                playsInline
                muted
                ref={yourVideoRef}
                autoPlay
                className="absolute right-0 m-4 h-[8rem] w-[12rem] rounded-2xl bg-slate-600 sm:mr-[2.5rem] sm:mt-[2rem]  md:shrink-0 lg:rounded-2xl"
              />
            )}
            <div className="absolute bottom-20 left-0 right-0 m-auto flex h-20 w-auto flex-row items-center justify-around md:bottom-[4rem] lg:bottom-[10rem]  ">
              <ToggleCallMuteDeclined />
            </div>
          </div>
        }
        chat={
          <div className="hidden  h-screen  w-screen flex-1 basis-1/5 flex-col sm:m-4 sm:mx-1 md:my-4  lg:block lg:pr-4 2xl:block">
            <div className=" max-h-fit w-full flex-col justify-center rounded-2xl bg-white drop-shadow-xl lg:h-3/4 ">
              <p className=" mx-6 pt-6 text-start text-2xl text-primary">
                Yok Park
              </p>
              <div className=" mx-6 h-px bg-primary"></div>
              {chat.map((text) => {
                return (
                  <div className="  my-2 h-5/6  w-full   flex-col justify-between px-4">
                    {text.name === user?.firstName ? (
                      <div className=" flex flex-row  items-end justify-end space-x-2 p-4">
                        <p className=" text-strat mx-2 flex items-center rounded-tr-2xl rounded-bl-2xl rounded-tl-2xl bg-slate-200 p-4 before:content-[attr(before)]">
                          {text.message}
                        </p>
                        <img
                          src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                          alt="image"
                          className="h-10 w-10 rounded-full border-none object-cover align-middle shadow-lg"
                        />
                      </div>
                    ) : (
                      <div className=" flex flex-row  items-end justify-start space-x-2 p-4 ">
                        <img
                          src={`https://ui-avatars.com/api/?name= ${user?.firstName}`}
                          alt="image"
                          className="h-10 w-10 rounded-full border-none object-cover align-middle shadow-lg"
                        />

                        <p className=" text-strat sm:text-strat mx-4 flex items-center rounded-tr-2xl rounded-br-2xl rounded-tl-2xl  bg-slate-200 p-4 before:content-[attr(before)]">
                          {text.message}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end p-4"></div>
                  </div>
                );
              })}
            </div>

            <div className="auto-col-max grid grid-flow-col grid-cols-10 py-4 ">
              <div className=" auto-col-max col-span-9 grid  grid-flow-col grid-cols-7 justify-evenly rounded-xl bg-input-massage p-2 ">
                <div className=" col-span-1 flex h-full items-center justify-center  ">
                  <img
                    src="/assets/images/attach-file.png"
                    alt="attach"
                    className="h-7 w-7  "
                  />
                </div>

                <input
                  type="text"
                  className="col-span-6 m-2   h-auto w-auto rounded-3xl bg-white py-3 px-2 drop-shadow-xl "
                  id="exampleFormControlInput1"
                  placeholder="Imput massage"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div
                className="col-span-1 mx-1 grid h-full cursor-pointer items-center justify-items-center rounded-xl bg-input-massage"
                onClick={sendChat}
              >
                <img
                  className=" mx-2 h-[1.5rem] w-[1.5rem]  "
                  src="/assets/images/send.png"
                  alt="send"
                />
              </div>
            </div>
          </div>
        }
      ></ChatUi>
    </>
  );
}
export default VideoChatForm;
