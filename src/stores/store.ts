import VideoCallSlice from "./slice/videoCallSlice";
import { LoginApi } from "./service/loginService";
import overlayStatusSlice from "./slice/overlayStatusSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reducer = {
  [LoginApi.reducerPath]: LoginApi.reducer,
  overlayStatusSlice,
  VideoCallSlice,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LoginApi.middleware),
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
