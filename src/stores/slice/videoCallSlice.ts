import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";
const initialState = {
  callAccepted: false,
  callEnded: false,
  stream: null,
  name: "",
  calls: [],
  me: "",
  myVideo: undefined,
  userVideo: undefined,
  connectionRef: undefined,
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
      state.calls = action.payload;
    },
    setMe: (state, action) => {
      state.me = action.payload;
    },
    setMyVideoRef: (state) => {
      state.myVideo = useRef(null) as any;
    },
    setUserVideoRef: (state) => {
      state.userVideo = useRef(null) as any;
    },
    setConnectionRef: (state) => {
      state.connectionRef = useRef(null) as any;
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
} = videoCallSlice.actions;
