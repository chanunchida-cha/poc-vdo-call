import { User } from "./../../Model/interface/InterfaceUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userState: User = {
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  licenseNo: "",
  password: "",
  role: "",
  sex: "",
  _id: "",
};

export const LoginSlice = createSlice({
  name: "userState",
  initialState: userState,
  reducers: {
    setUserState: (state: User, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.id = action.payload._id;
      state.lastName = action.payload.lastName;
      state.licenseNo = action.payload.licenseNo;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.sex = action.payload.sex;
      state._id = action.payload._id;
    },
  },
});

export default LoginSlice.reducer;
export const { setUserState } = LoginSlice.actions;
