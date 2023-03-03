import loginSlice from './slice/loginSlice';
import overlayStatusSlice from './slice/overlayStatusSlice';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const reducer = {
  loginSlice,overlayStatusSlice
  
};

export const store = configureStore({
  reducer,
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector