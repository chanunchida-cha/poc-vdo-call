import { io, Socket } from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

interface InitialState {
  callAccepted: boolean;
  callEnded: boolean;
  stream: MediaStream | undefined;
  name: string;
  calls: Call[];
  me: string;
  myVideo: null;
  userVideo: null;
  connectionRef: null;
  openCamera: boolean;
  socket: Socket;
}

const initialState: InitialState = {
  callAccepted: false,
  callEnded: false,
  stream: undefined,
  name: "",
  calls: [],
  me: "",
  myVideo: null,
  userVideo: null,
  connectionRef: null,
  openCamera: true,
  socket: io(`${process.env.NEXT_PUBLIC_SERVER}/chat_test`),
};

export const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    setCallAccepted: (state, action) => {
      state.callAccepted = action.payload;
    },
    setCallEnded: (state, action) => {
      state.callEnded = action.payload;
    },
    setStream: (state, action) => {
      state.stream = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCalls: (state, action) => {
      const { from, name, signal } = action.payload;
      state.calls.push({ from, name, signal, isReceivingCall: true });
    },
    setMe: (state, action) => {
      state.me = action.payload;
    },
    setMyVideoRef: (state, action) => {
      state.myVideo = action.payload;
    },
    setUserVideoRef: (state, action) => {
      state.userVideo = action.payload;
    },
    setConnectionRef: (state, action) => {
      state.connectionRef = action.payload;
    },
    setOpenCamera: (state, action) => {
      state.openCamera = !action.payload;
    },
  },
});

export default videoCallSlice.reducer;
export const {
  setCallAccepted,
  setCallEnded,
  setStream,
  setName,
  setCalls,
  setMe,
  setMyVideoRef,
  setUserVideoRef,
  setConnectionRef,
  setOpenCamera,
} = videoCallSlice.actions;
