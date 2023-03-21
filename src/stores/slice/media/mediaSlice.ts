import { store } from "@/stores/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const startMediaStream = createAsyncThunk(
  "mediaStream/startMediaStream",
  async (_, { getState }) => {
    const { microphone } = store.getState().toggleMedia;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      return stream;
    } catch (error) {
      throw new Error("Failed to start media stream");
    }
  }
);

export const stopMediaStream = createAsyncThunk(
  "mediaStream/stopMediaStream",
  async (stream:MediaStream) => {
    try {
      if (stream) {
        stream.getTracks().forEach((track: any) => track.stop());
      }
    } catch (error) {
      throw new Error("Failed to stop media stream");
    }
  }
);

export const stopMediaVideo = createAsyncThunk(
  "mediaStream/stopMediaVideo",
  async (stream:MediaStream) => {
    try {
      if (stream) {
        stream.getVideoTracks().forEach((elem: any) => {
          elem.enabled =false;
          return true;
        });
      }
    } catch (error) {
      throw new Error("Failed to stop media video");
    }
  }
);

export const startMediaVideo = createAsyncThunk(
  "mediaStream/startMediaVideo",
  async (stream:MediaStream) => {
    try {
      if (stream) {
        stream.getVideoTracks().forEach((elem: any) => {
          elem.enabled =true;
          return true;
        });
      }
    } catch (error) {
      throw new Error("Failed to start media video");
    }
  }
);

export const muteMediaMic = createAsyncThunk(
  "mediaStream/muteMediaMic",
  async (stream:MediaStream) => {
    try {
      if (stream) {
        stream.getAudioTracks().forEach((elem: any) =>{
          elem.enabled = false; // or false to mute it.
          return true;
        })
      }
    } catch (error) {
      console.log("Failed to mute media stream")
      throw new Error("Failed to mute media stream");
    }
  }
);

export const enableMediaMic = createAsyncThunk(
  "mediaStream/enableMediaMic",
  async (stream:MediaStream) => {
    try {
      if (stream) {
        stream.getAudioTracks().forEach((elem: any) =>{
          elem.enabled = true; // or false to mute it.
          return true;
        })
      }
    } catch (error) {
      console.log("Failed to mute media stream")
      throw new Error("Failed to mute media stream");
    }
  }
);

const mediaSlice = createSlice({
  name: "mediaStream",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startMediaStream.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(stopMediaStream.fulfilled, (state, action) => {
        return null;
      });
  },
});

export const {} = mediaSlice.actions;
export default mediaSlice.reducer;
