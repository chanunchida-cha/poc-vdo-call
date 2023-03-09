import React from "react";
import ChatUi from "../layouts/ChatUi";
import { useEffect, useRef, useState } from "react";
import ToggleCallMuteDeclined from "@/global/components/ToggleCallMuteDeclined";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setCalls, setMe, setStream } from "@/stores/slice/videoCallSlice";

type Props = {};

function VideoChatForm({}: Props) {
  const dispatch = useAppDispatch();
  const vidoCall = useAppSelector((state) => state.videoCall);
  const [openVDO, setOpenVDO] = useState(true);
  const [bgVDOCall, setBgVDOCall] = useState(openVDO);

  const socket = io(`${process.env.NEXT_PUBLIC_SERVER}/chat_test`);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: openVDO, audio: true })
      .then((currentStream) => {
        try {
          dispatch(setStream(currentStream));

          vidoCall.myVideo.current.srcObject = currentStream;
        } catch (err) {
          console.log(err);
        }
      });

    socket.on("me", (id) => {
      dispatch(setMe(id));
      console.log(id);
    });

    socket.on("callTimeout", ({ message }) => {
      console.log(message);
    });
  }, [vidoCall.name]);

  useEffect(() => {
    socket.on("callUser", ({ from, name: string, signal }) => {
      dispatch(
        setCalls([
          ...vidoCall.calls,
          { isReceivingCall: true, from, name: string, signal },
        ])
      );
    });
    socket.on("rejectCallByCalling", ({ from, message }) => {
      let newCall = vidoCall.calls.filter(
        (call: {
          isReceivingCall: boolean;
          from: any;
          name: string;
          signal: any;
        }) => {
          return call.from !== from;
        }
      );
      setCalls(newCall);
    });
  }, [vidoCall.calls]);

  return (
    <>
      <ChatUi
        video={
          <div className="relative h-screen flex-1 basis-1/2  rounded-2xl  md:mx-4 md:my-4   ">
            <div className="absolute  h-3/4 w-full md:h-full">
              {/* <div className=" h-screen w-full bg-black object-cover  drop-shadow-xl md:rounded-3xl lg:h-5/6 "></div> */}

              {vidoCall.stream && (
                <video
                  playsInline
                  muted
                  ref={vidoCall.userVideo}
                  autoPlay
                  className=" h-screen w-full bg-black object-cover  drop-shadow-xl md:rounded-3xl lg:h-5/6"
                />
              )}
              {/* <div className=" h-full w-full bg-black  object-cover drop-shadow-xl md:rounded-3xl "></div> */}
            </div>
           <div>
           <video
              playsInline
              muted
              ref={vidoCall.myVideo}
              autoPlay
              className=" absolute right-0 m-4 h-[9rem] w-[10rem] rounded-2xl bg-slate-600 sm:mr-[2.5rem] sm:mt-[2rem]  md:shrink-0 lg:rounded-2xl"
            />
           </div>

            <div className="absolute bottom-0 left-0 right-0 m-auto flex h-20 w-auto flex-row items-center justify-around lg:bottom-[10rem]  ">
              <ToggleCallMuteDeclined onClickVDO={setOpenVDO} />
            </div>
          </div>
        }
        chat={
          <div className="hidden  h-screen  w-screen flex-1 basis-1/5 flex-col sm:m-4 sm:mx-1 sm:block  md:my-4 lg:pr-4">
            <div className=" h-3/4 w-full flex-col justify-center rounded-2xl bg-white drop-shadow-xl  ">
              <p className=" mx-6 pt-6 text-start text-2xl text-primary">
                Yok Park
              </p>
              <div className=" mx-6 h-px bg-primary"></div>
              <div className="  my-2 h-5/6  w-full   flex-col justify-between px-4">
                <div className=" flex flex-row  items-end justify-start space-x-2 p-4 ">
                  <img
                    src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                    alt="image"
                    className="h-10 w-10 rounded-full border-none object-cover align-middle shadow-lg"
                  />

                  <p className=" text-strat sm:text-strat mx-4 flex items-center rounded-tr-2xl rounded-br-2xl rounded-tl-2xl  bg-slate-200 p-4 before:content-[attr(before)]">
                    เราจะได้พบกันอีกไหม
                  </p>
                </div>
                <div className=" flex flex-row  items-end justify-end space-x-2 p-4">
                  <p className=" text-strat mx-2 flex items-center rounded-tr-2xl rounded-bl-2xl rounded-tl-2xl bg-slate-200 p-4 before:content-[attr(before)]">
                    โอ้ว อย่าเลยอย่าพบชั้น!!!
                  </p>
                  <img
                    src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                    alt="image"
                    className="h-10 w-10 rounded-full border-none object-cover align-middle shadow-lg"
                  />
                </div>

                <div className="flex justify-end p-4"></div>
              </div>
            </div>

            <div className="auto-col-max grid grid-flow-col grid-cols-4 py-4 ">
              <div className=" auto-col-max col-span-3 grid  grid-flow-col grid-cols-4 justify-evenly rounded-xl bg-input-massage p-2 ">
                <div className=" col-span-1 h-full  place-self-center py-3 ">
                  <img
                    src="/assets/images/attach-file.png"
                    alt="attach"
                    className="h-10 w-10  "
                  />
                </div>

                <input
                  type="text"
                  className="col-span-3 m-2   h-auto w-auto rounded-3xl bg-white py-3 px-2 drop-shadow-xl "
                  id="exampleFormControlInput1"
                  placeholder="Imput massage"
                />
                <div className=" col-span-1 h-full  py-3">
                  <img
                    src="/assets/images/smile.png"
                    alt="smile"
                    className=" h-10 w-10  "
                  />
                </div>
              </div>
              <div className="col-span-1 mx-1 grid h-full items-center justify-items-center rounded-xl bg-input-massage">
                <img
                  className=" mx-2 h-[3rem] w-[3rem]  "
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
