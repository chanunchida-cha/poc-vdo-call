import { History } from "./../../Model/interface/InterfaceHistory";
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

export const { useGetAllHistoryQuery } = GetAllHistory;
export const { useGetHistoryByPatientIdQuery } = GetHistoryByPatientId;
