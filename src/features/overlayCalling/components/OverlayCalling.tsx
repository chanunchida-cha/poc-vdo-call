import ToggleButtonPharmacy from "@/shared-components/components/ToggleButtonPharmacy";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useEffect, useState } from "react";

import { User } from "@/models/interface/InterfaceUser";

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

  useEffect(() => {
    socket.on("callUser", ({ from, name, signal, user_pk }) => {
      console.log("ทำงาน");
      setCalls([
        ...calls,
        { isReceivingCall: true, from, name, signal, user_pk },
      ]);
    });
  }, [calls]);

  console.log("calls", calls);

  return (
    <>
      {calls.map((call: Call) => {
        return (
          <div key={call.from}>
            {call.isReceivingCall && !vidoCall.callAccepted && (
              <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black opacity-[0.87]">
                <div className="grid h-[40rem] w-[25rem] grid-rows-2">
                  <div className="mx-auto mt-[4rem]  text-white">
                    <div className="text-center  text-4xl font-bold xs:pt-16 sm:pt-0">
                      {call.name}
                    </div>
                    <div className="text-center text-base font-[400]">
                      Video call...
                    </div>
                  </div>
                  <div className="mx-auto self-end text-white">
                    <div className="mb-[7rem] text-center text-2xl font-[500]">
                      Calling...
                    </div>
                  </div>
                  <ToggleButtonPharmacy call={call} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
