import React from 'react'
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const overlayStatus =false
export const OverlayStatusSlice = createSlice({
    name:"overlayStatus",
    initialState:overlayStatus,
    reducers:{
        setOverlayStatus: (state:boolean)=> !state
    }

})



export default OverlayStatusSlice.reducer;
export const { setOverlayStatus } = OverlayStatusSlice.actions;
