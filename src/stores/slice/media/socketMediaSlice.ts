import { serviceName } from "@/models/const/routeName";
import { io, Socket } from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";
import Peer from "simple-peer";
import { store } from "@/stores/store";

type InitialState = {
  socket: Socket;
  mySocketID: string;
};

type TStream = {};

const initialState: InitialState = {
  socket: io(`${serviceName.path.chat}`),
  mySocketID: "",
};

const socketMediaSlice = createSlice({
  name: "socketMedia",
  initialState,
  reducers: {
    getSocketID: (state) => {
      state.socket.on("me", (id) => {
        state.mySocketID = id;
      });
    },
    setDoctorReady: (state, action) => {
      state.socket.emit("readyToCall", action.payload);
    },
    setDoctorBusy: (state, action) => {
      state.socket.emit("notReadyToCall", action.payload);
    },
    callToDoctor: (stat, action) => {
      const stream = store.getState().mediaStream;
      if (stream !== null) {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        const name = action.payload;
        peer.on("signal", (data) => {
          stat.socket.emit("callUser", {
            signal: data,
            name,
            user_pk: "test",
            to: "",
          });
        });
      }
    },
  },
});

export default socketMediaSlice.reducer;
export const {getSocketID,setDoctorReady,setDoctorBusy,callToDoctor } = socketMediaSlice.actions;
