// Next JS Imports
import Image from "next/image";

// Type Imports
import { ICategory } from "@/types/category.interface";

// React Icon Imports
import { IoMdSettings } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface IPropsTypes {
  category: ICategory;
  handleDelete?: (id: number) => void;
  handleEdit?: (type: string, id: string) => void;
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
      <div className="border-2 border-[#852E2C] rounded overflow-hidden">
        <Image
          src={category.image}
          alt="Image"
          width={300}
          height={300}
          style={{ height: "100%", width: "100%" }}
          priority={true}
        />
      </div>
      <div
        className="flex flex-col justify-end w-full absolute bottom-0 pb-4 px-4 h-[50%]"
        style={{
          background: "linear-gradient(hsla(0, 0%, 100%, 0), 20%, #852E2C",
        }}
      >
        <div className="flex items-center justify-between mb-1 w-full">
          <div className="bg-primary rounded-full flex flex-row w-max p-1 px-3 items-center">
            <p className="text-[10px] text-secondary">{`${category.items?.length} items`}</p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="rounded-full bg-white p-1">
              {/* Settings Icon */}
              <IoMdSettings
                color="#852E2C"
                className="cursor-pointer"
                onClick={
                  handleSettings
                    ? () => handleSettings(category.id)
                    : () => console.log("No Handler linked!")
                }
              />
            </div>
            <div className="rounded-full bg-white p-1">
              {/* Edit Icon */}
              <MdModeEdit
                color="#852E2C"
                className="cursor-pointer"
                onClick={
                  handleEdit
                    ? () => handleEdit("category", category.id.toString())
                    : () => console.log("No Handler linked!")
                }
              />
            </div>
            <div className="rounded-full bg-white p-1">
              {/* Delete Icon */}
              <MdDelete
                color="#852E2C"
                className="cursor-pointer"
                onClick={
                  handleDelete
                    ? () => handleDelete(category.id)
                    : () => console.log("No Handler linked!")
                }
              />
            </div>
          </div>
        </div>

        {/* Category Name */}
        <p className="text-white font-sans">{category.name}</p>

        {/* Category Description */}
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
