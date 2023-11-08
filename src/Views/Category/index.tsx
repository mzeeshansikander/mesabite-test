// React Imports
import ActionButtons from "@/components/ActionButtons";
import { useGlobalStore } from "@/context/global";
import { Folders } from "@/data/foods";
import { ScreensTypes } from "@/enums";
import { Button } from "flowbite-react";
import Image from "next/image";
import { FC, Fragment, useContext, useState } from "react";
import { BsChevronDown, BsUpload } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

// For ID
import { v4 } from "uuid";

// Functions Import

interface IPropTypes {}

const CategoryView: FC<IPropTypes> = () => {
  // States
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const { setCategories, setCurrentScreen } = useGlobalStore();

  // Form Cancel Handler
  const handleCancel = () => {
    setCurrentScreen(ScreensTypes.HOME);
  };

  // Form Save Handler
  const handleSave = () => {
    if (!name) {
      toast.error("Please type Category Name");
      return;
    }
    setCategories((prev: any) => [
      ...prev,
      {
        id: v4(),
        name: name,
        description: desc,
        image: "www.example.com/pasta",
        items: [],
      },
    ]);
    toast.success("Category Added Successfully!");
    setCurrentScreen(ScreensTypes.HOME);
  };

  return (
    <Fragment>
      <div className="w-screen h-screen max-w-[390px] flex flex-col justify-start">
        {/* Body */}
        <div className="flex-col h-full pt-[18px] px-[20px] bg-[#FFF6DF]">
          <div className="flex flex-row justify-between items-center mt-[30px] mb-[17px]">
            <p className="font-bold text-[#852E2C] text-[20px] font-monserrat">
              Add New Category
            </p>
            <svg viewBox="0 0 15 15" height={25}>
              <MdCancel color="#852E2C" onClick={handleCancel} />
            </svg>
          </div>

          {/* Select Image Box */}
          <p className="font-semibold font-monserrat text-[#852E2C]">
            Image (Optional)
          </p>
          <div
            className="flex flex-col justify-center gap-2 items-center border-4 border-[#852E2C] rounded-[15px] h-[344px] px-2 my-2"
            style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 5%" }}
          >
            <svg viewBox="0 0 16 16" height={80}>
              <BsUpload color="#852E2C" />
            </svg>
            <p className="text-[#852E2C] font-monserrat text-center mt-4 font-semibold">
              Click here to upload an image
            </p>
          </div>

          {/* Name Input Field  */}
          <div className="mb-[37px] mt-[17px]">
            <p className="font-semibold font-monserrat text-[#852E2C]">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              type="text"
              className="border-[#852E2C] h-[40px] my-2 bg-transparent border-2 rounded-full w-full font-monserrat"
            />
            <p className="text-[#BF5627] w-full text-right text-[10px] font-monserrat">
              {`${name.length}/50`}
            </p>
          </div>

          {/* Description Input Field  */}
          <div className="mb-[37px] mt-[17px]">
            <p className="font-semibold font-monserrat text-[#852E2C]">
              {`Description (Optional)`}
            </p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.currentTarget.value)}
              aria-rowcount={10}
              className="border-[#852E2C] h-[192px] my-2 bg-transparent border-2 rounded-3xl w-full font-monserrat"
            />
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <ActionButtons handleCancel={handleCancel} handleSave={handleSave} />
      </div>
    </Fragment>
  );
};

export default CategoryView;
