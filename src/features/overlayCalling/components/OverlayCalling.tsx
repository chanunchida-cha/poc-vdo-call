import ToggleButtonPharmacy from "@/shared-components/components/ToggleButtonPharmacy";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useEffect, useState } from "react";

import { User } from "@/models/interface/InterfaceUser";
import { callbackCallNotification } from "@/stores/slice/media/socketMediaSlice";

export { default as getServerSideProps } from "@/utils/getServerSideProps";

type Props = {
  user?: User;
};

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
  user_pk: string;
}

export default function OverlayCalling({ user }: Props) {
  const vidoCall = useAppSelector((state) => state.videoCall);
  const socketMedia = useAppSelector((state) => state.socketMedia);
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.socketMedia.socket);
  const [calls, setCalls] = useState<Call[]>([]);
  const [onLoadSetCallback, setOnLoadSetCallback] = useState(false)


  useEffect(() => {
    socket.on("callUser", ({ from, name, signal, user_pk }) => {
      console.log("ทำงาน");
      setCalls([
        ...calls,
        { isReceivingCall: true, from, name, signal, user_pk },
      ]);
    });
    socket.on("rejectCallByCalling", ({ from, message }) => {
      let newCall = calls.filter((call) => {
        return call.from !== from;
      });
      setCalls(newCall);
    });

    socket.on("answerReject", ({ reject }) => {
      let newCall = calls.filter((call) => {
        return call.from !== reject;
      });
      setCalls(newCall);
    });

    socket.on("callTimeout", ({ message ,rejectId}) => {
      console.log('--callTimeout clear overlay--')
      let newCall = calls.filter((call) => {
        return call.from !== rejectId;
      });
      setCalls(newCall);
    });

  }, [calls]);

  console.log(calls);
  
  useEffect(() => {
    socket.on("timeoutCounter", ({ message }) => {
      console.log(message);
    });
  }, []);

  useEffect(()=>{
    if(onLoadSetCallback){
      console.log("setcallbackCallNotification")
      setOnLoadSetCallback(false)
      dispatch(callbackCallNotification())
    }
  }, [onLoadSetCallback])

  useEffect(()=>{
    if(!vidoCall.isSetCallbackFromSocket){
      setOnLoadSetCallback(true)
    }
  }, [vidoCall.isSetCallbackFromSocket])

  const OnAccept= ()=>{
    setCalls([])
  }

  return (
    <>
      {calls.length > 0 && !vidoCall.callAccepted && (
        <div className="fixed inset-0  z-50 h-screen  w-screen bg-black bg-opacity-[0.87]  sm:px-[15rem]">
          {calls.map((call: Call) => {
            return (
              <>
                {call.isReceivingCall && !vidoCall.callAccepted && (
                  <div className="sm:mt-5">
                    <div className="grid grid-cols-2 gap-4 rounded-br-lg rounded-bl-lg border border-gray-200 bg-white px-[1rem] py-[1rem] shadow-xl   sm:rounded-lg">
                      <div className=" flex items-center  justify-center text-[0.8rem] font-bold text-primary sm:text-[1.5rem]">
                        {call.name}...
                      </div>

                      <div className="flex justify-end">
                        <ToggleButtonPharmacy call={call} user={user!} onAccept={OnAccept} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
