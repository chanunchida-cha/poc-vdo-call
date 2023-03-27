import React, { useState } from "react";
import MuteIcon from "@/Model/Svg/Mute.svg";
import UnMuteIcon from "@/Model/Svg/UnMute.svg";
import DeclinedCallIcon from "@/Model/Svg/DeclinedCall.svg";
import ToggleIcon from "@/shared-components/components/ToggleIcon";
import VDOIcon from "@/Model/Svg/VDO.svg";
import UnVDOIcon from "@/Model/Svg/UnVDO.svg";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setOverlayStatus } from "@/stores/slice/overlayStatusSlice";
import { SlCallEnd } from "react-icons/sl";
import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { setCalling, setOpenUserCamera } from "@/stores/slice/videoCallSlice";
import { enableMediaMic, muteMediaMic, startMediaVideo, stopMediaVideo } from "@/stores/slice/media/mediaSlice";
import { cancelCall, endCall, onChangeCam } from "@/stores/slice/media/socketMediaSlice";

interface Status {
  setOnChat: any;
}
export default function ToggleCallMuteDeclined(Props: Status) {
  const statusOverlay = useAppSelector((state) => state.overlayStatusSlice);
  const vidoCall = useAppSelector((state) => state.videoCall);
  const dispatch = useAppDispatch();
  const [onMute, setMute] = useState(false);
  const [onVDO, setVDO] = useState(false);

  const mediaStream = useAppSelector((state) => state.mediaStream);

  return (
    <div className="mb-[4rem] flex justify-center ">
      <div className="ml-3 mr-3 flex cursor-pointer items-center justify-center pl-[4rem]">
        <div
          className="flex items-center  justify-center rounded-full bg-zinc-600 text-white xs:p-2 xs:text-3xl sm:p-3 sm:text-5xl"
          onClick={() => {
            if(mediaStream){
              if(onMute){
                dispatch(enableMediaMic(mediaStream));
              }else{
                dispatch(muteMediaMic(mediaStream));
              }  
            }

            setMute(!onMute)}}
        >
          <ToggleIcon
            onClick={onMute}
            Icon={<BsFillMicFill size={35}/>}
            IconToggle={<BsFillMicMuteFill size={35}/>}
          />
        </div>
      </div>
      <div
        onClick={() => {
          if(vidoCall.callAccepted){
            dispatch(endCall())
          }else{
            dispatch(cancelCall())
          }
        }}
        className="flex cursor-pointer items-center justify-center rounded-full  bg-red-600 text-white xs:h-10 xs:w-10 xs:p-7 xs:text-3xl sm:p-10 sm:text-5xl"
      >
        {statusOverlay ? (
          <div onClick={() => dispatch(setOverlayStatus())}>
            <SlCallEnd className="hover:brightness-[0.75] " />
          </div>
        ) : (
          <div>
            <SlCallEnd className="hover:brightness-[0.75] " />
          </div>
        )}
      </div>
      <div className="ml-3 mr-3 flex items-center justify-center pr-[4rem] ">
        <button
          className="flex items-center  justify-center rounded-full bg-zinc-600 text-white xs:p-2 xs:text-3xl sm:p-3 sm:text-5xl"
          // className="flex items-center justify-center rounded-full bg-zinc-600 text-white xs:p-2 xs:text-3xl sm:p-3 sm:text-5xl"
          onClick={() => {
            if(mediaStream){
              if(onVDO){
                dispatch(startMediaVideo(mediaStream));
              }else{
                dispatch(stopMediaVideo(mediaStream));
              }            
            }

            dispatch(onChangeCam(onVDO))
            setVDO(!onVDO);
            dispatch(setOpenUserCamera(!vidoCall.openUserCamera));
          }}
        >
          <ToggleIcon
            onClick={onVDO}
            Icon= {<IoVideocam size={40}/>}
            IconToggle={<IoVideocamOff size={40}/>}
          />
        </button>

        <button
          className="flex items-center justify-center rounded-full bg-zinc-600 text-white xs:ml-3 xs:p-3 xs:text-3xl sm:hidden sm:p-3 sm:text-5xl"
          onClick={() => {
            Props.setOnChat(true);
          }}
        >
          <BsFillChatDotsFill size={35}/>
        </button>

        {/* </div> */}
      </div>
    </div>
  );
}
