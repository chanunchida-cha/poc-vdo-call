import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const statusLogin: boolean = false;
export const LoginSlice = createSlice({
  name: "statusLogin",
  initialState: statusLogin,
  reducers: {
    onChangeLoginStatusState: state => state = true,
  },
});

export default LoginSlice.reducer;
export const { onChangeLoginStatusState } = LoginSlice.actions;
