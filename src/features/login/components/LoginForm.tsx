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
        form={
          <form>
            <div className="mb-6">
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-primary "
                >
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  className="block w-full rounded-full border border-gray-300 bg-white py-[0.5rem] px-[1.5rem] text-[0.8rem] text-gray-900 shadow-md"
                  placeholder="samitivej@gmail.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-primary "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full rounded-full border border-gray-300 bg-white py-[0.5rem] px-[1.5rem] text-[0.8rem] text-gray-900 shadow-md"
                  placeholder="•••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className=" rounded-full bg-button-login  py-[0.3rem] px-[1.5rem] text-center text-[0.8rem]  font-medium text-white "
              >
                Sign in
              </button>
            </div>
          </form>
        }
      />
    </>
  );
}

export default LoginForm;
