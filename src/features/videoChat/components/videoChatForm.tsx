import React, { FormEvent, useEffect, useRef, useState } from "react";
import ChatUi from "../layouts/ChatUi";
import ToggleCallMuteDeclined from "@/shared-components/components/ToggleCallMuteDeclined";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  callToDoctor,
  errorCallNotification,
  getNotification,
} from "@/stores/slice/media/socketMediaSlice";
import { User } from "@/models/interface/InterfaceUser";
import { IoChevronBackCircle } from "react-icons/io5";
import { sendChat } from "@/stores/slice/chat/chatSlice";
import {
  ChatMessageMe,
  ChatMessageOther,
} from "@/features/chat/components/ChatMessage";
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
  const [onChat, setOnChat] = useState(false);
  const [chat, setChat] = useState<{ name: string; message: string }[]>([]);

  useEffect(() => {
    if (mediaStream) {
      myVideoRef.current.srcObject = mediaStream;
      dispatch(errorCallNotification());
      if (vidoCall.calling) {
        dispatch(callToDoctor(user!));
        dispatch(getNotification());
      }
    }
  }, [mediaStream, vidoCall.calling]);

  useEffect(() => {
    if (yourStream) {
      yourVideoRef.current.srcObject = yourStream;
    }
    console.log("yourStream", yourStream);
  }, [yourStream]);

  useEffect(() => {
    socket.on("sendChat", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, [chat]);

  useEffect(() => {
    socket.on("callAccept", (data) => {
      console.log("callAccept", data);
    });
  }, []);
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
                className="absolute right-0 m-4 h-[8rem] w-[12rem] rounded-2xl bg-black sm:mr-[2.5rem] sm:mt-[2rem]  md:shrink-0 lg:rounded-2xl"
              />
            )}
            <div className="absolute bottom-20 left-0 right-0 m-auto flex h-20 w-auto flex-row items-center justify-around md:bottom-[4rem] lg:bottom-[10rem]  ">
              <ToggleCallMuteDeclined setOnChat={setOnChat} />
            </div>
          </div>
        }
        chat={
          <div className="hidden  h-screen  w-screen flex-1 basis-1/5 flex-col sm:m-4 sm:mx-1 md:my-4  lg:block lg:pr-4 2xl:block ">
            <div className=" max-h-fit w-full flex-col justify-center overflow-x-hidden rounded-2xl bg-white drop-shadow-xl lg:h-3/4">
              <p className=" mx-6 pt-6 text-start text-2xl text-primary">
                Yok Park
              </p>
              <div className=" mx-6 h-px bg-primary"></div>
              <div className="h-auto-full flex-col  justify-between overflow-x-hidden">
                {chat.map((text) => {
                  console.log(text.name);
                  console.log(user?.firstName);
                  return (
                    <div className="  h-5/6  w-full   flex-col justify-between">
                      {text.name === user?.firstName ? (
                        <ChatMessageMe
                          name={text.name}
                          avatar={`https://ui-avatars.com/api/?name= ${text.name}`}
                          message={text.message}
                        />
                      ) : (
                        <ChatMessageOther
                          name={text.name}
                          avatar={`https://ui-avatars.com/api/?name= ${text.name}`}
                          message={text.message}
                        />
                      )}

                      <div className="flex justify-end p-4"></div>
                    </div>
                  );
                })}
              </div>
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
                onClick={() => {
                  dispatch(
                    sendChat({
                      name: user?.firstName!,
                      user_pk: user?.id!,
                      message: text,
                      role: user?.role!,
                    })
                  );
                  setText("");
                }}
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
        chatMobile={
          <div className="h-screen w-screen bg-white">
            <div className="h-screen">
              <div className="mt-[4rem] h-[80%] w-full rounded-2xl bg-white drop-shadow-xl">
                <div className="mx-6 flex items-center pb-2 pt-2">
                  <button
                    className="text-4xl text-gray-500"
                    onClick={() => setOnChat(false)}
                  >
                    <IoChevronBackCircle />
                  </button>
                  <span className="ml-3 text-2xl text-primary">Yok Park</span>
                </div>

                <div className=" mx-6 h-px bg-primary"></div>
                <div className="  h-auto  w-full   flex-col justify-between px-0  pb-0">
                  {chat.map((text) => {
                    return (
                      <>
                        {text.name === user?.firstName ? (
                          <ChatMessageMe
                            name={text.name}
                            avatar={`https://ui-avatars.com/api/?name= ${text.name}`}
                            message={text.message}
                          />
                        ) : (
                          <ChatMessageOther
                            name={text.name}
                            avatar={`https://ui-avatars.com/api/?name= ${text.name}`}
                            message={text.message}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="auto-col-max grid grid-flow-col grid-cols-4 py-4 ">
                <div className="auto-col-max col-span-3 grid  grid-flow-col grid-cols-5 justify-evenly rounded-xl bg-input-massage p-2 ">
                  <input
                    type="text"
                    className="col-span-4 m-2  h-[2rem] rounded-3xl bg-white py-3 px-2 drop-shadow-xl "
                    id="exampleFormControlInput1"
                    placeholder="Imput massage"
                  />
                  <div className="col-span-1 h-full place-self-center py-3">
                    <img
                      src="/assets/images/attach-file.png"
                      alt="attach"
                      className="h-[1.5rem] w-[1.5rem]  "
                    />
                  </div>
                  <div className=" col-span-1 h-full place-self-center py-3">
                    <img
                      src="/assets/images/smile.png"
                      alt="smile"
                      className=" h-[1.5rem] w-[1.5rem]  "
                    />
                  </div>
                </div>
                <div
                  className="col-span-1 mx-1 grid h-full items-center justify-items-center rounded-xl bg-input-massage"
                  onClick={() => {
                    dispatch(
                      sendChat({
                        name: user?.firstName!,
                        user_pk: user?.id!,
                        message: text,
                        role: user?.role!,
                      })
                    );
                    setText("");
                  }}
                >
                  <img
                    className=" mx-2 h-[1.5rem] w-[1.5rem]  "
                    src="/assets/images/send.png"
                    alt="send"
                  />
                </div>
              </div>
            </div>
          </div>
        }
        onChat={onChat}
      ></ChatUi>
    </>
  );
}
export default VideoChatForm;
