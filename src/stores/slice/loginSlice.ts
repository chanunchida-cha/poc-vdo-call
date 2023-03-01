import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const statusLogin: boolean = false;
export const LoginSlice = createSlice({
  name: "statusLogin",
  initialState: statusLogin,
  reducers: {
    onChangeCategoryState: (state, action: PayloadAction<boolean>) => {
      state = true;
    },
  },
});

export default LoginSlice.reducer;
export const { onChangeCategoryState } = LoginSlice.actions;
