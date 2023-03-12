import ToggleButtonPharmacy from "@/shared-components/components/ToggleButtonPharmacy";
import ToggleCallMuteDeclined from "@/shared-components/components/ToggleCallMuteDeclined";
import { useGetUserQuery } from "@/stores/service/getUserService";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useRef } from "react";
import Peer from "simple-peer";

interface Call {
  isReceivingCall: boolean;
  from: string;
  name: string;
  signal: any;
}

export default function OverlayCalling() {

  const dispatch = useAppDispatch();
  const firstname =
    typeof window !== "undefined" ? sessionStorage.getItem("firstname") : null;
  const { data, isLoading, error } = useGetUserQuery(firstname!);
  

  return (
    <>
    calling
      
    </>
  );
}
