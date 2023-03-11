import { type User } from "../../models/interface/InterfaceUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetUser = createApi({
  reducerPath: "getUser",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}`,
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (name) => ({
        url: `/user/${name}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery } = GetUser;
