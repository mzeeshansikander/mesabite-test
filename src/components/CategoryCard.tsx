import Image from "next/image";
import React from "react";

// Card Static Image
import thumbnail from "../assets/images/thumbnail_01.png";

// React Icon Imports
import { IoMdSettings } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface IPropsTypes {
  category: any;
  handleDelete?: any;
  handleEdit?: any;
  handleSettings?: any;
}

function CategoryCard({
  category,
  handleDelete,
  handleEdit,
  handleSettings,
}: IPropsTypes) {
  return (
    <div className="flex flex-col border-[#852E2C] rounded-[5px] max-h-[274px] my-2 relative">
      <Image src={thumbnail} alt="" width={0} height={0} />
      <div className="flex flex-col w-full absolute bottom-6 px-4">
        <div className="flex items-center justify-between mb-1 w-full">
          <div className="bg-[#FFCD00] rounded-full flex flex-row w-max p-1 px-3 items-center">
            <p className="text-[10px] text-[#852E2C]">{`${category.items?.length} items`}</p>
          </div>
          <div className="flex flex-row gap-2">
            <IoMdSettings
              color="#FFFFFF"
              onClick={
                handleSettings
                  ? () => handleSettings(category.id)
                  : () => console.log("No Handler linked!")
              }
            />
            <MdModeEdit
              color="#FFFFFF"
              onClick={
                handleEdit
                  ? () => handleEdit(category.id)
                  : () => console.log("No Handler linked!")
              }
            />
            <MdDelete
              color="#FFFFFF"
              onClick={
                handleDelete
                  ? () => handleDelete(category.id)
                  : () => console.log("No Handler linked!")
              }
            />
          </div>
        </div>

        <p className="text-white font-sans">{category.name}</p>
        <p className="text-white  font-sans text-[10px]">
          {category.description.length > 50
            ? category.description.slice(0, 50) + "..."
            : category.description}
        </p>
      </div>
    </div>
  );
}

export default CategoryCard;
