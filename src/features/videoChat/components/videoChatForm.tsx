import React from "react";
import ChatUi from "../layouts/ChatUi";
import { useEffect, useRef, useState } from "react";
import ToggleCallMuteDeclined from "@/global/components/ToggleCallMuteDeclined";

type Props = {};

function VideoChatForm({}: Props) {
  const [stream, setStream] = useState<MediaStream>();
  const myVideo: any = useRef(null);
  const [openVDO, setOpenVDO] = useState(true);

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
  }, [openVDO]);

  return (
    <>
      <ChatUi
        video={
          <div className="relative h-5/6 flex-1 basis-1/2  md:mx-6  md:my-4 md:rounded-2xl   ">
            <div className="absolute  h-full  w-full">
                
              {/* {stream && (
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  className="h-full w-full object-cover sm:rounded-xl"
                />
              )} */}
              <img
                src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                alt="image"
                className="h-screen w-full rounded-3xl  object-cover drop-shadow-xl "
              />
            </div>
            <div className=" absolute right-0 h-[8rem] w-[12rem] sm:mr-[2.5rem]  sm:mt-[2rem] sm:rounded md:rounded-lg  md:shrink-0 rounded-3xl ">
              <img
                src="https://i.pinimg.com/originals/5a/e9/7f/5ae97f2a2d3b223a6af48d4aca84e6eb.jpg"
                alt="image"
                className="h-full w-full ms:rounded-lg md:rounded-lg rounded-3xl  object-cover drop-shadow-xl "
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 m-auto flex  h-20 w-auto flex-row items-center justify-around   ">
              <ToggleCallMuteDeclined onClickVDO={setOpenVDO} />
            </div>
          </div>
        }
        chat={
          <div className="hidden h-3/4 w-full flex-1 basis-1/5 flex-col sm:m-4 sm:mx-1 sm:block md:mx-6 md:my-4">
            <div className=" h-full w-full flex-col justify-center rounded-2xl bg-white drop-shadow-xl ">
              <p className=" mx-6 pt-6 text-start text-2xl text-primary">
                Yok Park
              </p>
              <div className=" mx-6 h-px bg-primary"></div>
              <div className="  my-2 h-5/6  w-full  max-w-md flex-col justify-between px-4">
                <div className=" flex flex-row  justify-start space-x-2 p-4 items-end ">
                  <img
                    src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                    alt="image"
                    className="h-10 w-10 rounded-full border-none object-cover align-middle shadow-lg"
                  />

                  <p className=" mx-4 flex items-center rounded-tr-2xl rounded-br-2xl rounded-tl-2xl bg-slate-200 p-4  text-strat before:content-[attr(before)] sm:text-strat">
                    เราจะได้พบกันอีกไหม
                  </p>
                </div>
                <div className=" flex flex-row  justify-end space-x-2 p-4 items-end">
                  <p className=" mx-2 flex items-center rounded-tr-2xl rounded-bl-2xl rounded-tl-2xl bg-slate-200 p-4 text-strat before:content-[attr(before)]">
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

            <div className="auto-col-max grid grid-flow-col grid-cols-4 py-6">
              <div className=" auto-col-max col-span-3 grid  grid-flow-col grid-cols-4 justify-evenly rounded-xl bg-input-massage p-2 ">
                <div className=" col-span-1 h-full place-self-center py-3">
                  <img
                    src="/assets/images/attach-file.png"
                    alt="attach"
                    className="h-10 w-10 "
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
