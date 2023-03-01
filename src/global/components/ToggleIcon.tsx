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
      <div className="cursor-pointer ">
        {Props.onClick ? (
          <div className="h-[100px] w-[100px] hover:brightness-[0.75] ">
            {Props.IconToggle}
          </div>
        ) : (
          <div className="h-[100px] w-[100px] hover:brightness-[0.75] ">
            {Props.Icon}
          </div>
        )}
        {Props.Text ? (
          <h5 className="mt-[0.5rem] text-center">{Props.Text}</h5>
        ) : null}
      </div>
    </>
  );
}
