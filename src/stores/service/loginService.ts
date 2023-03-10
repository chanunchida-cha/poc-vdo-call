import { type User } from "../../models/interface/InterfaceUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const LoginApi = createApi({
  reducerPath: "LoginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.query<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: `/user/${email}/${password}`,
        method: "GET",
      }),
      //transformResponse: (response:any) => response.data,
    }),
  }),
});

export const { useLazyLoginUserQuery } = LoginApi;
