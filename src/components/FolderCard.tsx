import Image from "next/image";
import React from "react";

// Card Static Image
import thumbnail from "../assets/images/thumbnail_01.png";

// React Icon Imports
import { IoMdSettings } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import CategoryCard from "./CategoryCard";

interface IPropsTypes {
  folder: any;
  handleDelete?: any;
  handleEdit?: any;
  handleSettings?: any;
}

function FolderCard({
  folder,
  handleDelete,
  handleEdit,
  handleSettings,
}: IPropsTypes) {
  return (
    <div className="border-[3px] border-[#852E2C] rounded-[10px] p-3 my-3">
      {/* Folder Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-row items-center">
          <AiOutlineMenu className="text-[#852E2C] font-bold" />
          <p className="font-bold text-[20px] mx-2 text-[#852E2C]">
            {folder.name}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <IoMdSettings
            color="#852E2C"
            className="cursor-pointer"
            onClick={
              handleSettings
                ? handleSettings(folder.id)
                : () => console.log("No handler linked!")
            }
          />
          <MdModeEdit
            color="#852E2C"
            className="cursor-pointer"
            onClick={
              handleEdit
                ? () => handleEdit("folder", folder.id)
                : () => console.log("No handler linked!")
            }
          />
          <MdDelete
            color="#852E2C"
            className="cursor-pointer"
            onClick={
              handleDelete
                ? () => handleDelete(folder.id)
                : () => console.log("No handler linked!")
            }
          />
        </div>
      </div>

      {/* Folder Categories */}
      {folder.categories.map((category: any, idx: number) => (
        <CategoryCard key={idx} category={category} />
      ))}
    </div>
  );
}

export default FolderCard;
