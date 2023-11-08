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
import InfiniteScroll from "react-infinite-scroll-component";
import FolderCard from "@/components/FolderCard";

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

  const editCategory = (editType: string, itemId: number) => {
    setToEdit({ editType, itemId });
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

  const [dataLimit, setDataLimit] = useState(2);
  const [more, ssetMore] = useState(true);

  const dataCount = folders.length + categories.length;

  console.log({ dataLimit, dataCount });

  const fetchMore = () => {
    setDataLimit((prev) => prev + 2);
    return;
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

          <InfiniteScroll
            dataLength={dataCount} //This is important field to render the next data
            next={fetchMore}
            hasMore={dataLimit < dataCount}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {/* Menu Folders */}
            {queryFolders
              ? queryFolders.map((folder: any, idx: number) => {
                  if (idx + 1 > dataLimit) return;
                  else
                    return (
                      <FolderCard
                        key={`${folder.id} ${idx}`}
                        folder={folder}
                        handleDelete={deleteFolder}
                        handleEdit={editFolder}
                      />
                    );
                })
              : folders.map((folder: any, idx: number) => {
                  if (idx + 1 > dataLimit) return;
                  else
                    return (
                      <FolderCard
                        key={`${folder.id} ${idx}`}
                        folder={folder}
                        handleDelete={deleteFolder}
                        handleEdit={editFolder}
                      />
                    );
                })}

            {/* All Categories */}
            <div className="px-3 my-4">
              {queryCategories
                ? queryCategories?.map((category: any, idx: number) => {
                    if (idx + 1 + folders.length > dataLimit) return;
                    return (
                      <CategoryCard
                        key={`${category.id}-${idx}`}
                        category={category}
                        handleDelete={deleteCategory}
                        handleEdit={editCategory}
                      />
                    );
                  })
                : categories?.map((category: any, idx: number) => {
                    if (idx + 1 + folders.length > dataLimit) return;
                    return (
                      <CategoryCard
                        key={`${category.id}-${idx}`}
                        category={category}
                        handleDelete={deleteCategory}
                        handleEdit={editCategory}
                      />
                    );
                  })}
            </div>

            {/* <div className="px-3 my-4">
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
          </div> */}

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
          </InfiniteScroll>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeView;
