import React from "react";
import ChatUi from "../layouts/ChatUi";
import { useEffect, useRef, useState } from "react";

type Props = {};

function VideoChatForm({}: Props) {
    const [stream, setStream] = useState<MediaStream>();
    const myVideo: any = useRef(null);
  
    useEffect(() => {
      const stream = async () => {
        const currentStream = await navigator.mediaDevices.getUserMedia({
          video:false,
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
    }, []);
  return (
    <>
      <ChatUi
        video={
          <div className="relative mx-6 my-4 h-5/6 flex-1 basis-1/2 rounded-2xl   ">
            <div className="absolute  h-full  w-full">
            {/* {stream && (
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  className="h-full w-full sm:rounded-xl object-cover"
                />
              )} */}
              <img
                src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                alt="image"
                className="h-full w-full rounded-3xl  object-cover drop-shadow-xl "
              />
            </div>
            <div className=" absolute right-0 mr-10 mt-10 h-[8rem] w-[12rem] rounded-3xl md:shrink-0 ">
              <img
                src="https://i.pinimg.com/originals/5a/e9/7f/5ae97f2a2d3b223a6af48d4aca84e6eb.jpg"
                alt="image"
                className="h-full w-full rounded-3xl  object-cover drop-shadow-xl md:h-full md:w-48"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 m-auto flex  h-20 w-40 flex-row items-center justify-around  rounded-3xl ">
              {/* <button
                type="submit"
                className=" h-10 w-10 rounded-full bg-slate-400  "
              >
                <img
                  src="/assets/images/voice.png"
                  alt="image"
                  className="h-full w-full rounded-3xl  object-cover drop-shadow-xl "
                />
              </button>
              <button
                type="submit"
                className=" h-10 w-10 rounded-full bg-slate-400  "
              >
                <img
                  src="/assets/images/leave.png"
                  alt="image"
                  className="h-full w-full rounded-3xl  object-cover drop-shadow-xl "
                />
              </button>
              <button
                type="submit"
                className=" h-10 w-10 rounded-full bg-slate-400  "
              >
                <img
                  src="/assets/images/video.png"
                  alt="image"
                  className="h-full w-full rounded-3xl  object-cover drop-shadow-xl "
                />
              </button> */}
            </div>

          </div>
        }
        chat={
          <div className="mx-6 my-4  h-3/4   w-full flex-1 basis-1/5 flex-col ">
            <div className=" h-full w-full flex-col justify-center rounded-2xl bg-white drop-shadow-xl ">
              <p className=" mx-6 pt-6 text-start text-2xl text-primary">
                Yok Park
              </p>
              <div className=" mx-6 h-px bg-primary"></div>
              <div className=" mx-6 my-2 h-5/6  w-auto  max-w-md flex-col justify-between px-4">
                <div className=" grid grid-cols-4 py-5 hover:grid-rows-6 ">
                  <div className=" col-span-1 h-10 w-10">
                    <img
                      src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                      alt="image"
                      className="h-full w-full rounded-full border-none object-cover align-middle shadow-lg"
                    />
                  </div>
                  <p className="col-span-3 mx-4 flex items-center rounded-tr-3xl rounded-br-3xl rounded-tl-3xl bg-slate-200 px-10 text-center before:content-[attr(before)]">
                    เราจะได้พบกันอีกไหม
                  </p>
                </div>
                <div className=" grid grid-cols-4 justify-end hover:grid-rows-6 ">
                  <p className="col-span-3 mx-4 flex items-center rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl bg-slate-200 px-10 text-center before:content-[attr(before)]">
                    โอ้ว อย่าเลยอย่าพบชั้น!!!
                  </p>
                  <div className=" col-span-1 h-10 w-10">
                    <img
                      src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                      alt="image"
                      className="h-full w-full rounded-full border-none object-cover align-middle shadow-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end p-4"></div>
              </div>
            </div>

            <div className="auto-col-max grid grid-flow-col grid-cols-4 py-6">
              <div className=" auto-col-max col-span-3 grid  grid-flow-col grid-cols-4 justify-evenly rounded-xl bg-input-massage p-2 ">
                <div className=" col-span-1 h-full py-3">
                  <img
                    src="/assets/images/attach-file.png"
                    alt="attach"
                    className="h-10 w-10 "
                  />
                </div>

                <input
                  type="text"
                  className="col-span-3 m-2   h-auto w-auto rounded-3xl bg-white py-3 px-3 drop-shadow-xl "
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
