import ToggleCallMuteDeclined from "@/global/components/ToggleCallMuteDeclined";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function OverlayCalling() {
  const statusOverlay = useAppSelector((state) => state.overlayStatusSlice);
  console.log(statusOverlay);

  return (
    <>
      {statusOverlay && (
        <div className="fixed inset-0 flex h-screen w-full items-center justify-center bg-black opacity-[0.87]">
          <div className="grid h-[40rem] w-[25rem] grid-rows-2">
            <div className="mx-auto mt-[4rem]  text-white">
              <div className="text-center  text-4xl font-bold ">Yok Park</div>
              <div className="text-center text-base font-[400]">
                Video call...
              </div>
            </div>
            <div className="mx-auto self-end text-white">
              <div className="mb-[7rem] text-center text-2xl font-[500]">
                Calling...
              </div>
            </div>
            <ToggleCallMuteDeclined />
          </div>
        </div>
      )}
    </>
  );
}
