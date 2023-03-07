import { io } from "socket.io-client";
import Peer, { SignalData } from "simple-peer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRef } from "react";

const socket = io("http://localhost:8080/chat_test");

interface Call {
  isReceivingCall: boolean;
  from?: string;
  name?: string;
  signal?: SignalData;
  dur?: number;
}

interface SocketState {
  call: Call;
  callAccepted: boolean;
  myVideo: React.RefObject<HTMLVideoElement> | null;
  userVideo: React.RefObject<HTMLVideoElement> | null;
  stream: MediaStream | undefined;
  name: string;
  callEnded: boolean;
  me: string;
}

const initialState: SocketState = {
  call: { isReceivingCall: false },
  callAccepted: false,
  myVideo: null,
  userVideo: null,
  stream: undefined,
  name: "",
  callEnded: false,
  me: "",
};
export const VideoCallSlice = createSlice({
  name: "calling",
  initialState: initialState,
  reducers: {
    callUser(id) {
      const peer = new Peer({ initiator: false, trickle: false, stream });

      peer.on("signal", (data) => {
        socket.emit("callUser", {
            userToCall: id,
            signal: data,
            from: me,
            name,
            dur:30,
        });
    });

      peer.on("stream", (currentStream: MediaStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = currentStream;
        }
      });

      peer.signal(call.signal as SignalData);

      connectionRef.current = peer;
    },
  },
});

export default VideoCallSlice.reducer;
export const { callUser } = VideoCallSlice.actions;
