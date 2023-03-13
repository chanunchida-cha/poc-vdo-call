import { useGetUserQuery } from "@/stores/service/getUserService";
import { User } from "@/models/interface/InterfaceUser";
import { serviceName } from "@/models/const/routeName";
import { io, Socket } from "socket.io-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Peer from "simple-peer";
import { setCallAccepted, setCallEnded } from "../videoCallSlice";
import { GetUser } from "@/stores/service/getUserService";
import { startMediaStream } from "./mediaSlice";

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
  user_pk: string;
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

export const setDoctorsReady = createAsyncThunk(
  "socketMedia/setDoctorsReady",
  async (payload: { user_pk: string; name: string }, {}) => {
    socket.emit("readyToCall", payload);
  }
);

export const callToDoctor = createAsyncThunk(
  "socketMedia/callToDoctor",
  async (user: User, { getState, dispatch }) => {
    const stream = getState().mediaStream;
    if (stream !== null) {
      console.log("hello");
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on("signal", (data) => {
        socket.emit("callUser", {
          signal: data,
          from: user?.firstName,
          name: user?.firstName,
          user_pk: user?.id,
        });
      });

      socket.on("callAccepted", (signal) => {
        dispatch(setCallAccepted(true));
        peer.signal(signal);
      });

      peer.on("stream", (currentStream) => {
        if (!currentStream) return alert("not have yourStream");
        dispatch(setYourStream(currentStream));
      });
      //   initialState.connectionRef = peer;
    }
  }
);

export const getNotification = createAsyncThunk(
  "socketMedia/getNotification",
  async (_, { getState, dispatch }) => {
    socket.on("callUser", ({ from, name, signal }) => {
      dispatch(
        setCallNotification({ isReceivingCall: true, from, name, signal })
      );
    });
    const { calls } = getState().socketMedia;
    console.log("initialState.calls", calls);
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
  async (info: Call, { getState, dispatch }) => {
    dispatch(setCallAccepted(true));
    dispatch(startMediaStream());
    const stream = getState().mediaStream;
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (item) => {
      socket.emit("answerCall", {
        signal: item,
        user_pk: info.user_pk,
        to: info.from,
        name: info.name,
      });
    });

    peer.on("stream", (currentStream) => {
      dispatch(setYourStream(currentStream));
    });

    peer.signal(info.signal);
    initialState.connectionRef = peer;
    console.log("ทำงาน");
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
    setCallNotification: (state, action) => {
      const { from, name, signal, user_pk } = action.payload;
      state.calls.push({ from, name, signal, isReceivingCall: true, user_pk });
      console.log("call set", state.calls);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setDoctorsReady.fulfilled, (state, action) => {
        return console.log("work ready");
      })
      .addCase(callToDoctor.fulfilled, (state, action) => {
        return console.log("work callToDoctor");
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        return console.log("work getNotification", state.calls);
      })
      .addCase(doctorRejectCalling.fulfilled, (state, action) => {
        return console.log("work doctorRejectCalling");
      });
  },
});

export default socketMediaSlice.reducer;
export const {
  setDoctorReady,
  setDoctorBusy,
  setYourStream,
  setCallNotification,
} = socketMediaSlice.actions;
