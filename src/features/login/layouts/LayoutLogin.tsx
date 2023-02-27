import React from "react";

type Props = {
  logo: React.ReactNode;
};

function LayoutLogin({ logo }: Props) {
  return (
    <div className="h-screen w-screen ">
      <div className="my-[5rem] flex h-full w-full justify-center ">
        <div className="h-fit w-[20rem] rounded-xl bg-white p-10 shadow-md sm:w-[25.688rem]">
          <div className="flex justify-center">{logo}</div>
          <div className="flex justify-center">
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
                    className="block w-full rounded-full border border-gray-300 bg-white shadow-md py-[0.5rem] px-[1.5rem] text-[0.8rem] text-gray-900"
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
                    className="block w-full rounded-full border border-gray-300 bg-white shadow-md py-[0.5rem] px-[1.5rem] text-[0.8rem] text-gray-900"
                    placeholder="•••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" rounded-full bg-button-login  py-[0.3rem] px-[1.5rem] text-[0.8rem] text-center  font-medium text-white "
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutLogin;
