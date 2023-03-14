import React from "react";

interface status {
  onClick: boolean;
  Text?: string;
  Icon: any;
  IconToggle: any;
}
export default function ToggleIcon(Props: status) {
  return (
    <>
      <div className="flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center">
        {Props.onClick ? (
          <div className=" hover:brightness-[0.75]">{Props.IconToggle}</div>
        ) : (
          <div className=" hover:brightness-[0.75]">{Props.Icon}</div>
        )}
        {Props.Text ? (
          <h5 className="mt-[0.5rem] text-center">{Props.Text}</h5>
        ) : null}
      </div>
    </>
  );
}
