// React Imports
import { FC, Fragment, useContext, useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import img from "../../assets/images/thumbnail_01.png";

// Data import
import { useGlobalStore } from "@/context/global";

// For ID
import { v4 } from "uuid";

// Component Imports
import CategoryCard from "@/components/CategoryCard";
import { ScreensTypes } from "@/enums";
import { toast } from "react-toastify";

// Functions Import

interface HomeProps {}

const HomeView: FC<HomeProps> = () => {
  // Global States
  const {
    folders,
    setFolders,
    categories,
    setCategories,
    setCurrentScreen,
    setToEdit,
  } = useGlobalStore();

  // If items found in the database
  // const [haveItems, setHaveItems] = useState<boolean>(true);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const [queryCategories, setQueryCategories] = useState<any>(undefined);

  const [queryFolders, setQueryFolders] = useState<any>(undefined);

  const [query, setQuery] = useState<string>("");

  const addCategory = () => {
    setCurrentScreen(ScreensTypes.CATEGORY);
  };

  const addFolder = () => {
    setCurrentScreen(ScreensTypes.FOLDER);
  };
  const editFolder = (editType: string, itemId: number) => {
    setToEdit({ editType, itemId });
    setCurrentScreen(ScreensTypes.FOLDER);
  };

  const deleteFolder = (id: string) => {
    setFolders((prev: any) => prev.filter((folder: any) => folder.id !== id));
    toast.success("Folder has been deleted!");
  };

  const deleteCategory = (id: string) => {
    setCategories((prev: any) =>
      prev.filter((category: any) => category.id !== id)
    );
    toast.success("Category has been deleted!");
  };

  // const searchInput = useRef();

  const search = () => {
    setQueryCategories(
      categories.filter((category: any) =>
        category.name.toLowerCase().includes(query)
      )
    );
    setQueryFolders(
      folders.filter((folder: any) => folder.name.toLowerCase().includes(query))
    );
  };

  return (
    <Fragment>
      <div className="w-screen h-full max-w-[390px] mx-auto mb-auto">
        {/* Body */}
        <div className="flex-col h-full pt-[18px] px-[20px]">
          <p className="font-bold text-[#852E2C] text-[28px] my-2">YOUR MENU</p>
          {isSearchActive ? (
            <input
              placeholder="Search here..."
              type="text"
              value={query}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  search();
                }
              }}
              onChange={(e) => {
                setQuery(e.currentTarget.value);
                if (!e.currentTarget.value) {
                  setIsSearchActive(false);
                  setQueryCategories(undefined);
                  setQueryFolders(undefined);
                }
              }}
              className="border-2 border-[#852E2C] rounded-[15px] h-[37px] w-full bg-transparent"
            />
          ) : (
            <div
              onClick={() => setIsSearchActive(true)}
              className="flex flex-row justify-center gap-2 items-center border-2 border-[#852E2C] rounded-[15px] h-[37px]"
            >
              <BsSearch color="#852E2C" className="cursor-pointer" />
              <p className="text-[#852E2C] font-recoleta">SEARCH MENU</p>
            </div>
          )}

          <div
            className="flex flex-row gap-2 items-center mt-2 font-bold cursor-pointer"
            onClick={addFolder}
          >
            <svg viewBox="0 0 15 15" height={20}>
              <IoMdAddCircleOutline
                color="#852E2C"
                className="cursor-pointer"
              />
            </svg>
            <p className="text-[#852E2C] font-sans my-3">
              Create Category Folder
            </p>
          </div>

          {/* Menu Folders */}
          {queryFolders
            ? queryFolders.map((folder: any, idx: number) => (
                <div
                  key={`${folder.id} ${idx}`}
                  className="border-[3px] border-[#852E2C] rounded-[10px] p-3 my-3"
                >
                  {/* Folder Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-row items-center">
                      <AiOutlineMenu className="text-[#852E2C] font-bold cursor-pointer" />
                      <p className="font-bold text-[20px] mx-2 text-[#852E2C]">
                        {folder.name}
                      </p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <IoMdSettings
                        color="#852E2C"
                        className="cursor-pointer"
                      />
                      <MdModeEdit
                        color="#852E2C"
                        className="cursor-pointer"
                        onClick={() => editFolder("folder", folder.id)}
                      />
                      <MdDelete
                        color="#852E2C"
                        className="cursor-pointer"
                        onClick={() => deleteFolder(folder.id)}
                      />
                    </div>
                  </div>

                  {/* Folder Categories */}
                  {folder.categories.map((category: any, idx: number) => (
                    <CategoryCard key={idx} category={category} />
                  ))}
                </div>
              ))
            : folders.map((folder: any, idx: number) => (
                <div
                  key={`${folder.id} ${idx}`}
                  className="border-[3px] border-[#852E2C] rounded-[10px] p-3 my-3"
                >
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
                      />
                      <MdModeEdit
                        color="#852E2C"
                        className="cursor-pointer"
                        onClick={() => editFolder("folder", folder.id)}
                      />
                      <MdDelete
                        color="#852E2C"
                        className="cursor-pointer"
                        onClick={() => deleteFolder(folder.id)}
                      />
                    </div>
                  </div>

                  {/* Folder Categories */}
                  {folder.categories.map((category: any, idx: number) => (
                    <CategoryCard key={idx} category={category} />
                  ))}
                </div>
              ))}

          {/* All Categories */}
          <div className="px-3 my-4">
            {queryCategories
              ? queryCategories?.map((category: any, idx: number) => (
                  <CategoryCard
                    key={`${category.id}-${idx}`}
                    category={category}
                    handleDelete={deleteCategory}
                  />
                ))
              : categories?.map((category: any, idx: number) => (
                  <CategoryCard
                    key={`${category.id}-${idx}`}
                    category={category}
                    handleDelete={deleteCategory}
                  />
                ))}
          </div>

          {/* Ad New Categories */}
          <div
            className="flex flex-col justify-center gap-2 items-center border-2 border-[#852E2C] rounded-[15px] h-[344px] px-2"
            style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 10%" }}
            onClick={addCategory}
          >
            <svg viewBox="0 0 15 15" height={50}>
              <IoMdAddCircleOutline
                color="#852E2C"
                className="cursor-pointer"
              />
            </svg>
            <p className="text-[#852E2C] font-monserrat font-semibold max-w-[192px] text-center mt-4">
              ADD NEW CATEGORY TO YOUR MENU
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeView;
