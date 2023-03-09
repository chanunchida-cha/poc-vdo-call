import LoginSlice from "./slice/loginSlice";
import { LoginApi } from "./service/loginService";
import overlayStatusSlice from "./slice/overlayStatusSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { GetUser } from "./service/getUserService";

const reducer = {
  [LoginApi.reducerPath]: LoginApi.reducer,
  [GetUser.reducerPath]: GetUser.reducer,
  userState: LoginSlice,
  overlayStatusSlice,
};

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LoginApi.middleware, GetUser.middleware),
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
