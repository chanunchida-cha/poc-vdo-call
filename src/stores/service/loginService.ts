import { User } from "./../../Model/interface/InterfaceUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface StatusLogin {
  status: boolean;
  role: "user" | "pharmacy" | "admin" | "";
}
const statusLogin: StatusLogin = {
  status: false,
  role: "",
};

export const LoginApi = createApi({
  reducerPath: "LoginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, string>({
      query: (email) => `/user/${email}`,
    }),
  }),
});

export const { useLoginUserMutation } = LoginApi;
