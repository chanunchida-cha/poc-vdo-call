import Image from "next/image";
import React, { useEffect, useState } from "react";
import LayoutLogin from "../layouts/LayoutLogin";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useRouter } from "next/router";
import { useLoginUserMutation } from "@/stores/service/loginService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetUserQuery } from "@/stores/service/getUserService";
import { User } from "@/Model/interface/InterfaceUser";
import { setUserState } from "@/stores/slice/loginSlice";

const schema = yup
  .object({
    Email: yup.string().required(),
    Password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

type Props = {};

function LoginForm({}: Props) {
  const userLogin = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    id: "",
    lastName: "",
    licenseNo: "",
    password: "",
    role: "",
    sex: "",
    _id: "",
  });
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [loginUser] = useLoginUserMutation();
  const onSubmit = async (item: FormData) => {
    const result = await loginUser({
      email: item.Email,
      password: item.Password,
    });

    const res = "error" in result ? null : result.data;
    sessionStorage.setItem("email", res!.email);
    sessionStorage.setItem("firstname", res!.firstName);
    await setUser(res!);
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      route.push("/");
    }
  });

  const { data, isLoading, error } = useGetUserQuery(user!.firstName);
  console.log(data);
  // dispatch(setUserState(data!));
  // console.log("name from redux", userLogin.firstName);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <div className="mb-6">
                <label
                  htmlFor="Email"
                  className="mb-2 block text-sm font-medium text-primary "
                >
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  className="block w-full rounded-full border border-gray-300 bg-white py-[0.5rem] px-[1.5rem] text-[0.8rem] text-gray-900 shadow-md"
                  placeholder="samitivej@gmail.com"
                  {...register("Email", {
                    pattern: /^\S+@\S+$/i,
                  })}
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
                  {...register("Password")}
                  className="block w-full rounded-full border border-gray-300 bg-white py-[0.5rem] px-[1.5rem] text-[0.8rem] text-gray-900 shadow-md"
                  placeholder="•••••••••"
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
            <div></div>
          </form>
        }
      />
    </>
  );
}

export default LoginForm;
