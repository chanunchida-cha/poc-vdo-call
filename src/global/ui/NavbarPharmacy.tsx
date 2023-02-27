import React, { ReactElement } from "react";

interface Props {}

function NavbarPharmacy({}: Props): ReactElement {
  return (
    <div className=" border-borderNav  h-[3.8rem]  border-b  bg-primary px-2">
      <div className="flex  h-full items-center justify-end">
        <div className="flex flex-row items-center">
          <div className="mx-2 flex flex-col  ">
            <div className=" flex justify-end font-semibold text-white">
              Yok Park
            </div>

            <div className=" flex h-[1rem] w-[4rem]  items-center justify-between  rounded-full bg-white px-2 ">
              <div className="text-[0.8rem] text-primary">online</div>
              <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-status-online"></div>
            </div>
          </div>

          <div className="mx-2 flex h-[2.5rem] w-[2.5rem] items-center overflow-hidden rounded-full">
            <img
              src={
                "https://i.pinimg.com/originals/13/3c/2f/133c2f8e94d5b16f31a4d89ac0d177eb.jpg"
              }
              alt="profile"
              className="h-full w-full object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarPharmacy;
