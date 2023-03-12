import { Chat } from "@/models/interface/interfaceChatHistory";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Chat = {
  user_pk: string;
  name: string;
  message: string;
};

type InitialState = {
  chat: Chat[];
};

const initialState: InitialState = {
  chat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendChat: (state, action) => {
      const { socket } = getState().socketMedia;
      socket.emit("sendChat", action.payload);
      socket.on("sendChat", (data: Chat) => {
        initialState.chat.push(data);
      });
    },
  },
});

export default chatSlice.reducer;
export const { sendChat } = chatSlice.actions;
