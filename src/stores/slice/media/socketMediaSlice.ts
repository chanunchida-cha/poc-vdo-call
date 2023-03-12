import { serviceName } from "@/models/const/routeName";
import { io, Socket } from "socket.io-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Peer from "simple-peer";
import { store, useAppSelector } from "@/stores/store";

type InitialState = {
  socket: Socket;
  mySocketID: string;
  yourStream: MediaStream | null;
  callAccepted: boolean;
  connectionRef: any;
};

const initialState: InitialState = {
  socket: io(`${serviceName.path.chat}`),
  mySocketID: "",
  yourStream: null,
  callAccepted: false,
  connectionRef: null,
};

export const callToDoctor = createAsyncThunk(
  "socketMedia/callToDoctor",
  async (_, { getState }) => {
    const stream = store.getState().mediaStream;
    let { socket, callAccepted, yourStream } = store.getState().socketMedia;
    try {
      if (stream !== null) {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        const name = "sornsiri";
        peer.on("signal", (data) => {
          socket.emit("callUser", {
            signal: data,
            name,
            user_pk: "test",
            to: "",
          });
        });
        peer.on("stream", (currentStream) => {
          yourStream = currentStream;
        });

        socket.on("callAccepted", (signal) => {
          callAccepted = true;
          peer.signal(signal);
        });
      }
    } catch (error) {
      throw new Error("Failed to start media stream");
    }
  }
);

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
    // callToDoctor: (state, action) => {
    //   const stream = action.payload;
    //   if (stream !== null) {
    //     const peer = new Peer({ initiator: true, trickle: false, stream });
    //     const name = action.payload;
    //     peer.on("signal", (data) => {
    //       state.socket.emit("callUser", {
    //         signal: data,
    //         name,
    //         user_pk: "test",
    //         to: "",
    //       });
    //     });
    //     peer.on("stream", (currentStream) => {
    //       state.yourStream = currentStream;
    //     });

    //     state.socket.on("callAccepted", (signal) => {
    //       state.callAccepted = true;
    //       peer.signal(signal);
    //     });
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(callToDoctor.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default socketMediaSlice.reducer;
export const { getSocketID, setDoctorReady, setDoctorBusy } =
  socketMediaSlice.actions;
