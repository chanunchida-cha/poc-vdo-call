import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MediaState {
  microphone: boolean;
  video: boolean;
}

const initialState: MediaState = {
  microphone: false,
  video: false,
};

const toggleMediaSlice = createSlice({
  name: "toggleMedia",
  initialState,
  reducers: {
    toggleMicrophone: (state) => {
      state.microphone = !state.microphone;
    },
  },
});

export const { toggleMicrophone } = toggleMediaSlice.actions;
export default toggleMediaSlice.reducer;
