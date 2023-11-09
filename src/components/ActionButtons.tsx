import React from "react";

import { Button } from "flowbite-react";

interface IPropTypes {
  handleCancel?: () => void;
  handleSave?: () => void;
}

function ActionButtons({ handleCancel, handleSave }: IPropTypes) {
  return (
    <div className="flex flex-row justify-center gap-3 items-center p-2 h-[92px]">
      <Button
        className="!bg-secondary text-white h-[50px] w-[150px]"
        onClick={
          handleCancel ? handleCancel : () => console.log("No Handler linked!")
        }
      >
        Cancel
      </Button>
      <Button
        className=" !bg-primary text-secondary h-[50px] w-[150px]"
        onClick={
          handleSave ? handleSave : () => console.log("No Handler linked!")
        }
      >
        Save
      </Button>
    </div>
  );
}

export default ActionButtons;
