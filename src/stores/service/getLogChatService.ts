import { ChatHistory } from "@/models/interface/interfaceChatHistory";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetChatLogByRoomId = createApi({
  reducerPath: "getChatLogByRoomId",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}`,
  }),
  endpoints: (builder) => ({
    getChatLogByRoomId: builder.query<ChatHistory, string>({
      query: (room_id) => ({
        url: `http://localhost:8080/log/${room_id}`,
      }),
    }),
  }),
});

export const { useGetChatLogByRoomIdQuery } = GetChatLogByRoomId