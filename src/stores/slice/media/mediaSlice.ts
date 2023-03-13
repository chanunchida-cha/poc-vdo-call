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
