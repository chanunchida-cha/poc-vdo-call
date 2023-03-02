import React from "react";

type Props = {};

function Layout({}: Props) {
  return (
    <div className="mx-10 my-5 max-w-full">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="col-span-2 h-[35rem] rounded-xl bg-primary">
        <div className="relative mr-20 h-full w-full rounded-xl   ">
            <div className="absolute  h-full  w-full rounded-xl">
              <img
                src="https://i.pinimg.com/originals/a2/10/97/a210973a8646e616ae36e19a977aecd3.jpg"
                alt="image"
                className="h-full w-full  object-cover drop-shadow-xl rounded-xl"
              />
            </div>
            <div className=" absolute right-0 mr-10 mt-10 h-40 w-60  ">
              <img
                src="https://i.pinimg.com/originals/5a/e9/7f/5ae97f2a2d3b223a6af48d4aca84e6eb.jpg"
                alt="image"
                className="h-full w-full  object-cover drop-shadow-xl rounded-xl"
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
        </div>
        <div className="flex flex-col">
          <div className="flex basis-11/12 bg-blue-500 rounded-xl">v</div>
          <div className="flex basis-1/12 bg-amber-300 mt-3 rounded-xl">v</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
