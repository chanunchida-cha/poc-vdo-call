import { useGetUserQuery } from "@/stores/service/getUserService";
import { User } from "@/models/interface/InterfaceUser";
import { serviceName } from "@/models/const/routeName";
import { io, Socket } from "socket.io-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Peer from "simple-peer";
import {
  setCallAccepted,
  setCallEnded,
  setCalling,
  setCanCall,
  setIsSetCallbackFromSocket,
  setPharmacyCamera,
} from "../videoCallSlice";
import { GetUser } from "@/stores/service/getUserService";
import { startMediaStream, stopMediaStream } from "./mediaSlice";
import {
  setStartMediaRecord,
  setStartMediaRecordCombineAudio,
  setStopMediaRecord,
} from "./mediaRecordSlice";

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

interface Payload {
  call: Call;
  user: User;
}

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
    const onCall = getState().videoCall.callAccepted;
    console.log("onCall : " + onCall);
    if (stream !== null && !onCall) {
      console.log("hello");
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on("signal", (data) => {
        socket.emit("callUser", {
          signal: data,
          from: user?.firstName,
          name: user?.firstName,
          user_pk: user?.id,
          patientName: user?.firstName,
        });
      });

      let video_room_id = "";
      socket.on(
        "callAccepted",
        ({ signal, pharmacyName, license_no, patientName, room_id }) => {
          video_room_id = room_id;
          //dispatch(setStartMediaRecord({stream, room_id, name:patientName}));
          dispatch(setCallAccepted(true));
          peer.signal(signal);
        }
      );

      peer.on("stream", (currentStream) => {
        if (!currentStream) return alert("not have yourStream");
        dispatch(
          setStartMediaRecordCombineAudio({
            stream: currentStream,
            yourstream: stream,
            room_id: video_room_id,
            role: "user",
          })
        );
        dispatch(setYourStream(currentStream));
      });

      dispatch(setConnectionRef(peer));
    }
    
  }
);

export const checkCanCallToDoctor = createAsyncThunk(
  "socketMedia/checkCanCallToDoctor",
  async (_, { getState, dispatch }) => {
    const onCall = getState().videoCall.callAccepted;
    console.log("onCall : " + onCall);
    if (!onCall) {
      socket.emit("checkCanCall");
    
      socket.on("canCall", () => {
        dispatch(setCanCall(true));
      });
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
  async (payload: Payload, { getState, dispatch }) => {
    dispatch(setCallAccepted(true));
    const stream = getState().mediaStream;
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (item) => {
      socket.emit("answerCall", {
        signal: item,
        user_pk: payload.user.id,
        to: payload.call.from,
        pharmacyName: payload.user.firstName,
        license_no: payload.user.licenseNo,
      });
      //pharmacyName: payload.user.firstName
      //license_no: payload.user.licenseNo
      //patientName: payload.call.name
    });

    peer.on("stream", (currentStream) => {
      if (!currentStream) return alert("not have yourStream");
      dispatch(setYourStream(currentStream));
    });

    peer.signal(payload.call.signal);
    dispatch(setConnectionRef(peer));
    console.log("ทำงาน");
  }
);

export const resetConnectionRef = createAsyncThunk(
  "socketMedia/resetConnectionRef",
  async (_, { getState }) => {
    const { connectionRef } = getState().socketMedia;
    if (connectionRef) {
      try {
        connectionRef.destroy();
        socket.off("callAccepted");
      } catch {
        console.log("peer destroy :fail");
      }
    }
    return null;
  }
);

export const callbackCallNotification = createAsyncThunk(
  "socketMedia/callbackCallNotification",
  async (_, { getState, dispatch }) => {
    dispatch(setIsSetCallbackFromSocket(true));
    socket.on("endCallTime", (obj) => {
      try {
        const mediaRecorder = getState().mediaRecord.mediaRecorder;
        console.log("mediaRecorder : ", mediaRecorder);
        dispatch(setStopMediaRecord(mediaRecorder));
      } catch {}
      dispatch(resetConnectionRef());
      dispatch(setCallEnded(true));
      dispatch(setCanCall(false));
      dispatch(setCalling(false));
      dispatch(setCallAccepted(false));
      try {
        dispatch(setYourStream(null));
        const stream = getState().mediaStream;
        dispatch(stopMediaStream(stream));
        //window.location.reload();
      } catch (err) {
        console.log("error :" + err);
      }
    });

    socket.on("callTimeout", ({ message }) => {
      try {
        dispatch(resetConnectionRef());
        dispatch(setCanCall(false));
        dispatch(setCalling(false));
        const stream = getState().mediaStream;
        dispatch(stopMediaStream(stream));
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("callReject", ({ message }) => {
      dispatch(resetConnectionRef());
      dispatch(setCallAccepted(false));
      dispatch(setCanCall(false));
      dispatch(setCalling(false));
      try {
        const stream = getState().mediaStream;
        dispatch(stopMediaStream(stream));
      } catch (error) {
        console.log("error :", error);
      }
    });

    socket.on("callFail", ({ message }) => {
      try {
        dispatch(resetConnectionRef());
        dispatch(setCanCall(false));
        dispatch(setCalling(false));
        const stream = getState().mediaStream;
        dispatch(stopMediaStream(stream));
      } catch (error) {
        console.log(error);
      }
    });

    socket.on(
      "callRoomId",
      ({ pharmacyName, license_no, patientName, room_id }) => {
        const stream = getState().mediaStream;
        const currentStream = getState().socketMedia.yourStream;
        dispatch(
          setStartMediaRecordCombineAudio({
            stream: currentStream,
            yourstream: stream,
            room_id: room_id,
            role: "doctor",
          })
        );
      }
    );
  }
);

export const onChangeMediaStatus = createAsyncThunk(
  "socketMedia/onChangeMediaStatus",
  async (_, { getState, dispatch }) => {
    const stream = getState().mediaStream;
    socket.on("muteMic", ({ status }) => {
      console.log(status);
    });

    socket.on("closeCam", ({ status }) => {
      dispatch(setPharmacyCamera(status));
      console.log(status);
    });
  }
);

export const endCall = createAsyncThunk(
  "socketMedia/endCall",
  async (_, { dispatch }) => {
    socket.emit("endCall", {});
  }
);

export const cancelCall = createAsyncThunk(
  "socketMedia/cancelCall",
  async (_, { getState, dispatch }) => {
    dispatch(resetConnectionRef());
    dispatch(setCanCall(false));
    dispatch(setCalling(false));
    dispatch(setCallAccepted(false));
    socket.emit("cancelCall", {});
    const stream = getState().mediaStream;
    dispatch(stopMediaStream(stream));
  }
);

export const answerReject = createAsyncThunk(
  "socketMedia/answerReject",
  async (payload: Payload, { dispatch }) => {
    socket.emit("answerReject", {
      to: payload.call.from,
    });
  }
);

export const onChangeCam = createAsyncThunk(
  "socketMedia/onChangeCam",
  async (status: boolean, { dispatch }) => {
    socket.emit("closeCam", {
      status,
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
    setConnectionRef: (state, action) => {
      state.connectionRef = action.payload;
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
  setConnectionRef,
  setCallNotification,
} = socketMediaSlice.actions;
