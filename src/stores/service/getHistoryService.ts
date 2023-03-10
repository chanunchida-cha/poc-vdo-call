import { History } from "./../../models/interface/interfaceHistory";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetAllHistory = createApi({
  reducerPath: "getAllHistory",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}`,
  }),
  endpoints: (builder) => ({
    getAllHistory: builder.query<History[], void>({
      query: () => "/history",
    }),
  }),
});

export const GetHistoryByPatientId = createApi({
  reducerPath: "getHistoryByPatientId",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}`,
  }),
  endpoints: (builder) => ({
    getHistoryByPatientId: builder.query<History[], string>({
      query: (patient_id) => ({
        url: `/history/patient/${patient_id}`,
      }),
    }),
  }),
});

export const GetHistoryById = createApi({
  reducerPath: "getHistoryById",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}`,
  }),
  endpoints: (builder) => ({
    getHistoryById: builder.query<History, string>({
      query: (history_id) => ({
        url: `/history/get/${history_id}`,
      }),
    }),
  }),
});

export const { useLazyGetAllHistoryQuery } = GetAllHistory;
export const { useLazyGetHistoryByPatientIdQuery } = GetHistoryByPatientId;
export const { useLazyGetHistoryByIdQuery } = GetHistoryById;
