import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusLogin{
  status: boolean,
  role: "user" | "pharmacy"|"admin"|"";

}
const statusLogin:StatusLogin={
  status:false,
  role:"",
}

export const LoginSlice = createSlice({
  name: "statusLogin",
  initialState: statusLogin,
  reducers: {
    onChangeLoginStatusState: (state:StatusLogin) => {state.status = true},
  },
});

export default LoginSlice.reducer;
export const { onChangeLoginStatusState } = LoginSlice.actions;
