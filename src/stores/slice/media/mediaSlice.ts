import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MediaState {
  stream: MediaStream | null;
  error: Error | null;
  microphone: boolean;
  video: boolean;
  myVideo: null;
}

const initialState: MediaState = {
  stream: null,
  error: null,
  microphone: true,
  video: true,
  myVideo: null,
};

const mediaSetting = (constraints: any) => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      return console.log("stream", stream);
    })
    .catch((error: any) => {
      //   state.error = error;
      alert(error);
      throw new error();
    });
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    startCapture: (state) => {
      const constraints = { video: state.video, audio: state.microphone };
      const stream = mediaSetting(constraints);
      //   state.stream = stream;
    },
    stopCapture: (state) => {
      state.stream?.getTracks().forEach((track) => track.stop());
      state.stream = null;
    },
    setToggleMicrophone: (state) => {
      state.microphone = !state;
      const constraints = { audio: state.microphone };
      mediaSetting(state, constraints);
    },
    setToggleVideo: (state) => {
      state.video = !state;
      const constraints = { video: state.video };
      mediaSetting(state, constraints);
    },
    setMyVDORef: (state, action) => {
      state.myVideo = action.payload;
    },
  },
});

export const {
  startCapture,
  stopCapture,
  setToggleMicrophone,
  setToggleVideo,
  setMyVDORef,
} = mediaSlice.actions;
export default mediaSlice.reducer;
