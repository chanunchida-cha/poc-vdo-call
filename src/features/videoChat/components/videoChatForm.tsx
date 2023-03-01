import React from "react";
import ChatUi from "../layouts/ChatUi";

type Props = {};

function VideoChatForm({}: Props) {
  return (
    <>
      <ChatUi
        video={
          <div className="relative mr-20 h-5/6 basis-1/2 rounded-2xl    ">
            <div className="absolute  h-full  w-full">
              <img
                src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                alt="image"
                className="h-full w-full rounded-3xl  object-cover drop-shadow-xl "
              />
            </div>
            <div className=" absolute right-0 mr-10 mt-10 h-40 w-60 rounded-3xl ">
              <img
                src="https://i.pinimg.com/originals/5a/e9/7f/5ae97f2a2d3b223a6af48d4aca84e6eb.jpg"
                alt="image"
                className="h-full w-full rounded-3xl  object-cover drop-shadow-xl "
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 m-auto flex  h-20 w-60 flex-row items-center justify-center rounded-3xl bg-slate-300 ">
              <button
                type="submit"
                className=" h-10 w-10  rounded-full bg-slate-400  "
              >
                <img
                  src="/assets/images/smile.png"
                  alt="image"
                  className="h-full w-full rounded-3xl   object-cover drop-shadow-xl "
                />
              </button>
              <button
                type="submit"
                className=" h-10 w-10 rounded-full bg-slate-400  "
              >
                <img
                  src="/assets/images/smile.png"
                  alt="image"
                  className="h-full w-full rounded-3xl  object-cover drop-shadow-xl "
                />
              </button>
              <button
                type="submit"
                className=" h-10 w-10 rounded-full bg-slate-400  "
              >
                <img
                  src="/assets/images/smile.png"
                  alt="image"
                  className="h-full w-full rounded-3xl  object-cover drop-shadow-xl "
                />
              </button>
            </div>
          </div>
        }
        chat={
          <div className="flex  h-full   basis-1/5  flex-col ">
            <div className="flex h-4/5 w-full flex-col justify-center rounded-2xl bg-white drop-shadow-xl ">
              <p className=" mx-6 pt-6 text-start text-2xl text-primary">
                Yok Park
              </p>
              <div className=" mx-6 h-px bg-primary"></div>
              <div className=" mx-6 my-2 h-5/6  flex-col ">
                <div className="flex-row p-4">
                  <div className="flex flex-wrap  ">
                    <div className="h-14  w-14">
                      <img
                        src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                        alt="image"
                        className="h-full w-full rounded-full border-none object-cover align-middle shadow-lg"
                      />
                    </div>
                    <p className="mx-4 flex items-center rounded-tr-3xl rounded-br-3xl rounded-tl-3xl bg-slate-200 px-10 text-center before:content-[attr(before)]">
                      เราจะได้พบกันอีกไหม
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-end p-4">
                  <div className="flex flex-wrap  ">
                    <p className="mx-4 flex items-center rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl bg-slate-200 px-10 text-center before:content-[attr(before)]">
                      โอ้ว อย่าเลยอย่าพบชั้น!!!
                    </p>
                    <div className="h-14  w-14">
                      <img
                        src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                        alt="image"
                        className="h-full w-full rounded-full border-none object-cover align-middle shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-4  flex h-auto  flex-row  justify-between  ">
              <div className="flex  w-full flex-row items-center justify-center rounded-xl bg-input-massage p-2 drop-shadow-xl">
                <div className="flex h-full w-10  items-center  ">
                  <img src="/assets/images/attach-file.png" alt="attach" />
                </div>
                <div
                  className="relative w-96 py-3 px-3"
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    className=" bg-bg-white   w-full rounded-3xl py-3 px-3 drop-shadow-xl "
                    id="exampleFormControlInput1"
                    placeholder="Imput massage"
                  />
                </div>
                <div className=" h-10 w-10  items-center  ">
                  <img src="/assets/images/smile.png" alt="smile" />
                </div>
              </div>
              <div className="ml-2 flex h-auto w-20  items-center rounded-xl bg-input-massage">
                <img
                  className=" h-16 w-16 items-center justify-center p-2"
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
