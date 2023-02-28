import React from "react";

function ChatUi() {
  return (
    <div className="h-screen w-screen ">
      <div className="flex h-full w-full flex-row justify-center pt-6 ">
        <div className="basis-1/2 ">Video</div>
        <div className="h-full basis-1/3  flex-col  ">
          <div className="h-4/5 w-full justify-center rounded-2xl bg-white drop-shadow-xl ">
            <p className=" mx-6 pt-6 text-start text-2xl text-primary">
              Yok Park
            </p>
            <div className=" mx-6 h-px bg-primary"></div>
            <div className=" mx-6 my-2 h-5/6  flex-col bg-gray-100  ">
              <div className="flex-row p-4">
                <div className="flex flex-wrap  ">
                  <div className="h-20  w-20">
                    <img
                      src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                      alt="image"
                      className="h-full w-full rounded-full border-none object-cover align-middle shadow-lg"
                    />
                  </div>
                  <p className="flex bg-slate-500 items-center text-center before:content-[attr(before)]">
                    เราจะได้พบกันอีกไหม
                  </p>
                </div>
              </div>
              <div className="flex-row p-4">
                <div className="flex flex-wrap  ">
                  <p className=" bg-slate-500  text-center before:content-[attr(before)]">
                    เราจะได้พบกันอีกไหม
                  </p>
                  <div className="h-20  w-20">
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
          <div className=" mt-4  flex h-auto w-full flex-row  bg-white ">
            <div className="flex  flex-row rounded-xl bg-input-massage p-2 drop-shadow-xl">
              <div className=" h-full w-10   ">
                <img
                  className="items-center"
                  src="/assets/images/attach-file.png"
                  alt="attach"
                />
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
                <img
                  className=" place-content-center"
                  src="/assets/images/smile.png"
                  alt="smile"
                />
              </div>
            </div>
            <div className="ml-2 h-auto w-20  rounded-xl bg-input-massage">
              <img
                className=" items-center justify-center p-2"
                src="/assets/images/send.png"
                alt="send"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatUi;
