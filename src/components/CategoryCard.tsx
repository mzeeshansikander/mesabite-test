// React Imports
import React from "react";

// Next JS Imports
import Image from "next/image";

// Assets Imports
import thumbnail from "../assets/images/thumbnail_01.png";

// React Icon Imports
import { IoMdSettings } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { ICategory } from "@/types/category.interface";

interface IPropsTypes {
  category: ICategory;
  handleDelete?: (id: number) => void;
  handleEdit?: (type: string, id: number) => void;
  handleSettings?: (id: number) => void;
}

function CategoryCard({
  category,
  handleDelete,
  handleEdit,
  handleSettings,
}: IPropsTypes) {
  return (
    <div className="flex flex-col border-secondary rounded-[5px] max-h-[274px] my-2 relative">
      <Image src={category.image} alt="Image" width={330} height={275} />
      <div className="flex flex-col w-full absolute bottom-6 px-4">
        <div className="flex items-center justify-between mb-1 w-full">
          <div className="bg-primary rounded-full flex flex-row w-max p-1 px-3 items-center">
            <p className="text-[10px] text-secondary">{`${category.items?.length} items`}</p>
          </div>
          <div className="flex flex-row gap-2">
            <IoMdSettings
              color="#FFFFFF"
              className="cursor-pointer"
              onClick={
                handleSettings
                  ? () => handleSettings(category.id)
                  : () => console.log("No Handler linked!")
              }
            />
            <MdModeEdit
              color="#FFFFFF"
              className="cursor-pointer"
              onClick={
                handleEdit
                  ? () => handleEdit("category", category.id)
                  : () => console.log("No Handler linked!")
              }
            />
            <MdDelete
              color="#FFFFFF"
              className="cursor-pointer"
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
