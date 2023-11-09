// Type Imports
import { IFolder } from "@/types/folder.interface";

// Component Imports
import CategoryCard from "./CategoryCard";

// React Icon Imports
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";

// Type Imports
import { ICategory } from "@/types/category.interface";

interface IPropsTypes {
  folder: IFolder;
  handleDelete?: (id: number) => void;
  handleEdit?: (type: string, id: string) => void;
  handleSettings?: (id: number) => void;
}

function FolderCard({
  folder,
  handleDelete,
  handleEdit,
  handleSettings,
}: IPropsTypes) {
  return (
    <div className="border-[3px] border-secondary rounded-[10px] p-3 my-3">
      {/* Folder Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-row items-center">
          <AiOutlineMenu className="text-secondary font-bold" />
          <p className="font-bold text-[20px] mx-2 text-secondary">
            {folder.name}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          {/* Settings Icon */}
          <IoMdSettings
            color="#852E2C"
            className="cursor-pointer"
            onClick={
              handleSettings
                ? handleSettings(folder.id)
                : () => console.log("No handler linked!")
            }
          />

          {/* Edit Icons */}
          <MdModeEdit
            color="#852E2C"
            className="cursor-pointer"
            onClick={
              handleEdit
                ? () => handleEdit("folder", folder.id.toString())
                : () => console.log("No handler linked!")
            }
          />

          {/* Delete Icon */}
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
      {folder.categories.map((category: ICategory, idx: number) => (
        <CategoryCard
          key={idx}
          category={category}
        />
      ))}
    </div>
  );
}

export default FolderCard;
