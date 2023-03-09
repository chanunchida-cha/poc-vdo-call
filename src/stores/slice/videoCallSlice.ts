import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

const myVideo: any = useRef(null);
const userVideo = useRef();
const connectionRef = useRef();

const initialState = {
  callAccepted: false,
  callEnded: false,
  stream: null,
  name: "",
  calls: [],
  me: "",
  myVideo,
  userVideo,
  connectionRef,
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
