import React from "react";

type Props = {
  logo: React.ReactNode;
  form: React.ReactNode;
};

function LayoutLogin({ logo, form }: Props) {
  return (
    <div className="h-screen w-screen ">
      <div className="my-[5rem] flex h-full w-full justify-center ">
        <div className="h-fit w-[20rem] rounded-xl bg-white p-10 shadow-md sm:w-[25.688rem]">
          <div className="flex justify-center">{logo}</div>
          <div className="flex justify-center">{form}</div>
        </div>
      </div>
    </div>
  );
}

export default LayoutLogin;
