import { serviceName } from "@/models/const/routeName";
import { io, Socket } from "socket.io-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Peer from "simple-peer";
import { setCallAccepted, setCallEnded } from "../videoCallSlice";

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

type Call={
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

type InitialState = {
  socket: Socket;
  mySocketID: string;
  yourStream: MediaStream | null;
  callAccepted: boolean;
  connectionRef: any;
  calls: Call[];
};

const initialState: InitialState = {
  mySocketID: "",
  yourStream: null,
  callAccepted: false,
  connectionRef: null,
  socket: io(`${serviceName.path.chat}`),
  calls: [],
};

const socket = initialState.socket;
export const callToDoctor = createAsyncThunk(
  "socketMedia/callToDoctor",
  async (name, { getState, dispatch }) => {
    const stream = getState().mediaStream;
    if (stream !== null) {
      console.log("hello");
      const peer = new Peer({ initiator: true, trickle: false, stream });
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
      initialState.connectionRef = peer;
    }
  }
);

export const getNotification = createAsyncThunk(
  "socketMedia/getNotification",
  async (_, { getState }) => {
    socket.on("callUser", ({ from, name, signal }) => {
      initialState.calls.push({ isReceivingCall: true, from, name, signal });
    });
  }
);

export const doctorRejectCalling = createAsyncThunk(
  "socketMedia/rejectCalling",
  async () => {
    socket.on("rejectCallByCalling", ({ from, message }) => {
      const newCall = initialState.calls.filter((theCall) => {
        return theCall.from !== from;
      });
      initialState.calls = newCall;
    });
  }
);

export const acceptCall = createAsyncThunk(
  "socketMedia/acceptCall",
  async (info, { getState }) => {
    initialState.callAccepted = true;
    const stream = getState().mediaStream;
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: info.from });
    });

    peer.on("stream", (currentStream) => {
      initialState.yourStream = currentStream;
    });

    peer.signal(info.signal);
    initialState.connectionRef = peer;
  }
);

export const exitCall = createAsyncThunk(
  "socketMedia/exitCall",
  async (_, { dispatch }) => {
    socket.on("endCallTime", (obj) => {
      dispatch(setCallEnded(true));
    });
  }
);

const socketMediaSlice = createSlice({
  name: "socketMedia",
  initialState,
  reducers: {
    setDoctorReady: (state, action) => {
      state.socket.emit("readyToCall", action.payload);
    },
    setDoctorBusy: (state, action) => {
      state.socket.emit("notReadyToCall", action.payload);
    },
    setYourStream: (state, action) => {
      state.yourStream = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(callToDoctor.fulfilled, (state, action) => {
        return console.log("work callToDoctor");
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        return console.log("work getNotification");
      })
      .addCase(doctorRejectCalling.fulfilled, (state, action) => {
        return console.log("work doctorRejectCalling");
      });
  },
});

export default socketMediaSlice.reducer;
export const { setDoctorReady, setDoctorBusy, setYourStream } =
  socketMediaSlice.actions;
