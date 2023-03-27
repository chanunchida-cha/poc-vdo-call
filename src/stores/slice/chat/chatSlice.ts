import { Socket } from "socket.io-client";
import { store } from "@/stores/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  name: string;
  user_pk: string;
  role: string;
  message: string;
  type:string
}

type InitialState = {
  chat: Chat[];
};

const initialState: InitialState = {
  chat: [],
};

export const sendChat = createAsyncThunk(
  "sendChat/sendChat",
  async (info: Chat[], { getState, dispatch }) => {
    let sendData: Chat[] =[]
    info.forEach( e => {
      sendData.push(e)
    })
    const { socket } = getState().socketMedia;
    await socket.emit("sendChat", sendData);
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
