// React Imports
import { Folders } from "@/data/foods";
import { Button } from "flowbite-react";
import Image from "next/image";
import { FC, Fragment, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";

// Functions Import

interface AddProps {}

const AddView: FC<AddProps> = () => {
  return (
    <Fragment>
      <div className="w-screen max-w-[390px] flex flex-col justify-start border">
        {/* NavBar */}
        {/* <div className="bg-[#FFCD00] flex justify-between items-center px-4 h-[65px] w-full border-b-2 border-[#852E2C]">
          <div className="w-[18.57px] h-[11.43px]">
            <Image
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              src="/assets/menuIcon.png"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="w-[24px] h-[24px]">
              <Image
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                src="/assets/en-flag.png"
              />
            </div>
            <BsChevronDown />
          </div>
        </div> */}

        {/* Body */}
        <div className="flex-col h-full pt-[18px] px-[20px] bg-[#FFF6DF]">
          <text className="font-bold text-[#852E2C] text-[28px]">
            YOUR MENU
          </text>
          <div className="flex flex-row justify-center gap-2 items-center border-2 border-[#852E2C] rounded-[15px] h-[37px]">
            <BsSearch color="#852E2C" />
            <text className="text-[#852E2C] font-sans">SEARCH MENU</text>
          </div>

          <div className="flex flex-row gap-2 items-center mt-2 font-bold">
            <svg viewBox="0 0 15 15" height={50}>
              <IoMdAddCircleOutline color="#852E2C" />
            </svg>
            <text className="text-[#852E2C] font-sans my-3">
              Create Category Folder
            </text>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center border-2 border-[#852E2C] rounded-[15px] h-[344px] px-2">
            <svg viewBox="0 0 15 15" height={50}>
              <IoMdAddCircleOutline color="#852E2C" />
            </svg>
            <text className="text-[#852E2C] font-sans max-w-[192px] text-center mt-4">
              ADD NEW CATEGORY TO YOUR MENU
            </text>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-row justify-center gap-3 items-center p-2 h-[92px]">
          <Button className="bg-[#852E2C] text-white h-[50px] w-[150px]">
            Cancel
          </Button>
          <Button className="bg-[#FFCD00] text-[#852E2C] h-[50px] w-[150px]">
            Save
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddView;
