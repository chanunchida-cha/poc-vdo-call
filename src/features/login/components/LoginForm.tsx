/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Image from "next/image";
import React, { type FormEvent, useEffect, useState } from "react";
import LayoutLogin from "../layouts/LayoutLogin";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useRouter } from "next/router";
import { useLazyLoginUserQuery } from "@/stores/service/loginService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { type User } from "@/models/interface/InterfaceUser";
import { setUserState } from "@/stores/slice/loginSlice";
import { io } from "socket.io-client";
import { useSetUserStorage } from "@/hooks/useSetUserStorage";
import {
  setDoctorReady,
  setDoctorsReady,
} from "@/stores/slice/media/socketMediaSlice";

const schema = yup
  .object({
    Email: yup.string().required(),
    Password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function LoginForm() {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [trigger, { data, isLoading, error }] = useLazyLoginUserQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (item: FormData) => {
    await trigger({
      email: item.Email,
      password: item.Password,
    });
  };
  // ------ UseEffect and Hook -------
  useSetUserStorage(data, error);
  useEffect(() => {
    if (data?.role === "pharmacy") {
      // dispatch(setDoctorReady({ user_pk: data.id, name: data.firstName }));
      const payload = { user_pk: data.id, name: data.firstName };
      dispatch(setDoctorsReady(payload));
    }
  }, [data?.role]);

  // ------------------------------

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
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
            }}
          >
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
                onClick={handleSubmit(onSubmit)}
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
