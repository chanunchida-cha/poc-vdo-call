import { io, Socket } from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";
import { serviceName } from "@/models/const/routeName";

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

interface InitialState {
  callAccepted: boolean;
  callEnded: boolean;
  calling: boolean;
  canCall:boolean;
  stream: MediaStream | undefined;
  name: string;
  calls: Call[];
  me: string;
  myVideo: null;
  userVideo: null;
  connectionRef: null;
  openUserCamera: boolean;
  openPharmacyCamera: boolean;
  isSetCallbackFromSocket: boolean;
  mySocketID: string;
}

const initialState: InitialState = {
  callAccepted: false,
  calling: false,
  canCall:false,
  callEnded: false,
  stream: undefined,
  name: "",
  calls: [],
  me: "",
  myVideo: null,
  userVideo: null,
  connectionRef: null,
  openUserCamera: true,
  openPharmacyCamera: true,
  isSetCallbackFromSocket:false,
  mySocketID: "",
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
    setCalling: (state, action) => {
      state.calling = action.payload;
    },
    setCanCall: (state, action) => {
      state.canCall = action.payload;
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
    setOpenUserCamera: (state, action) => {
      state.openUserCamera = action.payload;
    },
    setPharmacyCamera: (state, action) => {
      state.openPharmacyCamera = action.payload;
    },
    setIsSetCallbackFromSocket:(state, action) => {
      state.isSetCallbackFromSocket = action.payload;
    }, 
  },
});

export default videoCallSlice.reducer;
export const {
  setCallAccepted,
  setCallEnded,
  setCalling,
  setCanCall,
  setStream,
  setName,
  setCalls,
  setMe,
  setMyVideoRef,
  setUserVideoRef,
  setConnectionRef,
  setOpenUserCamera,
  setPharmacyCamera,
  setIsSetCallbackFromSocket,
} = videoCallSlice.actions;
