import Image from "next/image";
import React from "react";
import LayoutLogin from "../layouts/LayoutLogin";

type Props = {};

function LoginForm({}: Props) {
  return (
   <>
    <LayoutLogin
      logo={
        <Image
          src={"/assets/images/logo.jpg"}
          height={115}
          width={200}
          alt="profile"
        />
      }
    />
   </>
  );
}

export default LoginForm;
