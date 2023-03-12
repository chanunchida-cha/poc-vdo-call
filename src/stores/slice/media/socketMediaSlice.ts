import { serviceName } from "@/models/const/routeName";
import { io, Socket } from "socket.io-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Peer from "simple-peer";

const socket: Socket = io(`${serviceName.path.chat}`);

type InitialState = {
  mySocketID: string;
  yourStream: MediaStream | null;
  callAccepted: boolean;
  connectionRef: any;
};

const initialState: InitialState = {
  mySocketID: "",
  yourStream: null,
  callAccepted: false,
  connectionRef: null,
};

export const callToDoctor = createAsyncThunk(
  "socketMedia/callToDoctor",
  async (_, { getState, dispatch }) => {
    const stream = getState().mediaStream;
    console.log("hello2", stream);
    if (stream !== null) {
      console.log("hello");
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
        dispatch(setYourStream(currentStream));
      });

      socket.on("callAccepted", (signal: any) => {
        dispatch(setCallAccepted(true));
        peer.signal(signal);
      });
    }
  }
);

const socketMediaSlice = createSlice({
  name: "socketMedia",
  initialState,
  reducers: {
    getSocketID: (state) => {
      socket.on("me", (id) => {
        state.mySocketID = id;
      });
    },
    setDoctorReady: (state, action) => {
      socket.emit("readyToCall", action.payload);
    },
    setDoctorBusy: (state, action) => {
      socket.emit("notReadyToCall", action.payload);
    },
    setYourStream: (state, action) => {
      state.yourStream = action.payload;
    },
    setCallAccepted: (state, action) => {
      state.callAccepted = action.payload;
    },
    // callToDoctor: (state, action) => {
    //   const stream = action.payload;
    //   if (stream !== null) {
    //     const peer = new Peer({ initiator: true, trickle: false, stream });
    //     const name = action.payload;
    //     peer.on("signal", (data) => {
    //       socket.emit("callUser", {
    //         signal: data,
    //         name,
    //         user_pk: "test",
    //         to: "",
    //       });
    //     });
    //     peer.on("stream", (currentStream) => {
    //       state.yourStream = currentStream;
    //     });

    //     socket.on("callAccepted", (signal) => {
    //       state.callAccepted = true;
    //       peer.signal(signal);
    //     });
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(callToDoctor.fulfilled, (state, action) => {
      return console.log("work callToDoctor");
    });
  },
});

export default socketMediaSlice.reducer;
export const {
  getSocketID,
  setDoctorReady,
  setDoctorBusy,
  setCallAccepted,
  setYourStream,
} = socketMediaSlice.actions;
