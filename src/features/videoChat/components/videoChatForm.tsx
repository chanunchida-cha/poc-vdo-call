import React from "react";
import ChatUi from "../layouts/ChatUi";
import { useEffect, useRef, useState } from "react";
import ToggleCallMuteDeclined from "@/global/components/ToggleCallMuteDeclined";

type Props = {};

function VideoChatForm({}: Props) {
  const [stream, setStream] = useState<MediaStream>();
  const myVideo: any = useRef(null);
  const [openVDO, setOpenVDO] = useState(true);
  const [bgVDOCall, setBgVDOCall] = useState(openVDO);

  useEffect(() => {
    const stream = async () => {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: openVDO,
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
  }, [openVDO, bgVDOCall]);

  return (
    <>
      <ChatUi
        video={
          <div className="relative h-screen flex-1 basis-1/2  rounded-2xl  lg:mx-4 lg:my-4   ">
            <div className="absolute  h-3/4 w-full md:h-full">
              {stream && (
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  className=" h-screen w-full bg-black object-cover  drop-shadow-xl lg:h-5/6 lg:rounded-3xl"
                />
              )}
            </div>
            <div className=" absolute right-0 m-4 h-[8rem] w-[12rem] rounded-2xl bg-slate-600 sm:mr-[2.5rem] sm:mt-[2rem]  md:shrink-0 lg:rounded-2xl"></div>

            <div className="absolute bottom-20 left-0 right-0 m-auto flex h-20 w-auto flex-row items-center justify-around md:bottom-[4rem] lg:bottom-[10rem]  ">
              <ToggleCallMuteDeclined onClickVDO={setOpenVDO} />
            </div>
          </div>
        }
        chat={
          <div className="hidden  h-screen  w-screen flex-1 basis-1/5 flex-col sm:m-4 sm:mx-1 md:my-4  lg:block lg:pr-4 2xl:block">
            <div className=" max-h-fit w-full flex-col justify-center rounded-2xl bg-white drop-shadow-xl lg:h-4/6 ">
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
