import { Socket } from "socket.io-client";
import { store } from "@/stores/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  user_pk: string;
  name: string;
  message: string;
}

type InitialState = {
  chat: Chat[];
};

const initialState: InitialState = {
  chat: [],
};

export const sendChat = createAsyncThunk(
  "sendChat/sendChat",
  async (info: Chat, { getState, dispatch }) => {
    const { user_pk, name, message } = info;
    const { socket } = getState().socketMedia;
    socket.emit("sendChat", { user_pk, name, message });
  }
);

const chatSlice = createSlice({
  name: "sendChat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendChat.fulfilled, (state, action) => {
      return console.log("work send chat");
    });
  },
});

export default chatSlice.reducer;
export const { setChat } = chatSlice.actions;
