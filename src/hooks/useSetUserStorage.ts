/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type User } from "@/models/interface/InterfaceUser";
import { setUserState } from "@/stores/slice/loginSlice";
import { useAppDispatch } from "@/stores/store";
import { useEffect } from "react";
import Cookie from "cookie-universal";
import { useRouter } from "next/router";

export const useSetUserStorage = (user?: User, error?: any) => {
  const dispatch = useAppDispatch();
  const cookies = Cookie();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      cookies.set("user", JSON.stringify(user));
      cookies.set("firstname", user.firstName);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dispatch(setUserState(user));
      router.push("/");
    } else if (error) {
      cookies.removeAll();
      alert("Username or password is incorrect");
    }
  }, [user, error]);

  return null;
};
