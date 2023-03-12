import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface MediaState {
//   stream: MediaStream | null;
//   error: Error | null;
//   microphone: boolean;
//   video: boolean;
//   myVideo: null;
// }

// const initialState: MediaState = {
//   stream: null,
//   error: null,
//   microphone: true,
//   video: true,
//   myVideo: null,
// };

export const startMediaStream = createAsyncThunk(
  "mediaStream/startMediaStream",
  async () => {
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

const mediaSlice = createSlice({
  name: "mediaStream",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startMediaStream.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {} = mediaSlice.actions;
export default mediaSlice.reducer;
