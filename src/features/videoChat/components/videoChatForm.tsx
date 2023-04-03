import React, { FormEvent, useEffect, useRef, useState } from "react";
import ChatUi from "../layouts/ChatUi";
import ToggleCallMuteDeclined from "@/shared-components/components/ToggleCallMuteDeclined";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  callToDoctor,
  getNotification,
  onChangeMediaStatus,
} from "@/stores/slice/media/socketMediaSlice";
import { User } from "@/models/interface/InterfaceUser";
import { IoChevronBackCircle } from "react-icons/io5";
import { sendChat } from "@/stores/slice/chat/chatSlice";
import {
  ChatMessageMe,
  ChatMessageOther,
} from "@/features/chat/components/ChatMessage";
import ImageUploading from "react-images-uploading";
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
  const [currentImageList, setImage] = useState([]);

  useEffect(() => {
    if (mediaStream) {
      myVideoRef.current.srcObject = mediaStream;
      dispatch(onChangeMediaStatus());
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
    socket.on("sendChat", ({ sendObj, status }) => {
      if (status === "SUCCESS") {
        let chatResult: { name: any; message: any }[] = [];
        sendObj.forEach((element: any) => {
          chatResult.push({
            name: element.name,
            message: element.message,
          });
        });
        setChat([...chat, ...chatResult]);
      }
    });
  }, [chat]);

  useEffect(() => {
    socket.on("callAccept", (data) => {
      console.log("callAccept", data);
    });
  }, []);
  console.log("chat", chat);

  const onFileChange = async (imageList: any, addUpdateIndex: any) => {
    var ready_to_upload_img_list = [];

    if (!!addUpdateIndex) {
      for (let i = 0; i < addUpdateIndex.length; i++) {
        ready_to_upload_img_list.push(imageList[addUpdateIndex[i]].file);
      }
    }

    if (ready_to_upload_img_list.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < ready_to_upload_img_list.length; i++) {
        formData.append("uploadfile", ready_to_upload_img_list[i]);
      }
      let promise = new Promise((rootResolver) =>
        fetch("http://localhost:8080/minioupload", {
          method: "POST",
          body: formData,
        }).then(async (res) => {
          let result_json: any = await res.json();
          rootResolver(result_json.url);
        })
      );

      let allUploaded: any = [];
      let tmpRes: any = await promise;

      for (let i = 0; i < tmpRes.length; i++) {
        allUploaded.push(tmpRes[i]);
      }
      setImage(allUploaded);
    }
  };
  return (
    <>
      <ChatUi
        video={
          <div className="relative h-screen flex-1 basis-1/2  rounded-2xl  lg:mx-4 lg:my-4   ">
            <div className="absolute  h-3/4 w-full md:h-full">
              {/* <div className=" h-screen w-full bg-black object-cover  drop-shadow-xl md:rounded-3xl lg:h-5/6 "></div> */}
              {vidoCall.callAccepted && (
                <video
                  hidden={!vidoCall.openPharmacyCamera}
                  playsInline
                  muted
                  ref={yourVideoRef}
                  autoPlay
                  className=" h-screen w-full bg-black object-cover  drop-shadow-xl lg:h-5/6 lg:rounded-3xl"
                />
              )}

              {/* <div className=" h-full w-full bg-black  object-cover drop-shadow-xl md:rounded-3xl "></div> */}
            </div>

            {mediaStream && (
              <video
                playsInline
                muted
                ref={myVideoRef}
                autoPlay
                className="absolute right-0 m-4 h-[10rem] rounded-2xl bg-black sm:mr-[2.5rem] sm:mt-[2rem]  md:shrink-0 lg:rounded-2xl"
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
                  <ImageUploading
                    multiple={true}
                    value={currentImageList}
                    onChange={onFileChange}
                    acceptType={["jpg", "png", "jpeg", "webp"]}
                  >
                    {({ imageList, onImageUpload }) => (
                      // write your building UI
                      <div onClick={onImageUpload}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                          />
                        </svg>
                      </div>
                    )}
                  </ImageUploading>
                  <ImageUploading
                    multiple={true}
                    value={currentImageList}
                    onChange={onFileChange}
                    acceptType={["jpg", "png", "jpeg", "webp"]}
                  >
                    {({ imageList, onImageUpload }) => (
                      // write your building UI
                      <div onClick={onImageUpload} className="pl-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </ImageUploading>
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
                  let chatArray = [];
                  if (text !== "") {
                    chatArray.push({
                      name: user?.firstName!,
                      user_pk: user?.id!,
                      message: text,
                      role: user?.role!,
                      type: "message",
                    });
                  }
                  if (currentImageList.length > 0) {
                    currentImageList.forEach((element) => {
                      chatArray.push({
                        name: user?.firstName!,
                        user_pk: user?.id!,
                        message: element,
                        role: user?.role!,
                        type: "image",
                      });
                    });
                    setImage([]);
                  }
                  dispatch(sendChat(chatArray));

                  setText("");
                }}
              >
                {/* <img
                  className=" mx-2 h-[1.5rem] w-[1.5rem]  "
                  src="/assets/images/send.png"
                  alt="send"
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
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
                    let chatArray = [];
                    if (text !== "") {
                      chatArray.push({
                        name: user?.firstName!,
                        user_pk: user?.id!,
                        message: text,
                        role: user?.role!,
                        type: "message",
                      });
                    }
                    if (currentImageList.length > 0) {
                      currentImageList.forEach((element) => {
                        chatArray.push({
                          name: user?.firstName!,
                          user_pk: user?.id!,
                          message: element,
                          role: user?.role!,
                          type: "image",
                        });
                      });
                      setImage([]);
                    }
                    dispatch(sendChat(chatArray));
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
