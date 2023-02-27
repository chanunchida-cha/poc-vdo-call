import Image from "next/image";
import React, { ReactElement } from "react";

interface Props {}

function NavbarUser({}: Props): ReactElement {
  return (
    <div className=" border-borderNav  h-[3.8rem]  border-b  bg-primary px-2">
      <div className="flex  h-full items-center justify-end">
        <div className="flex flex-row items-center">
          <div className="mx-2 font-semibold text-white">Yok Park</div>

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

export default NavbarUser;
