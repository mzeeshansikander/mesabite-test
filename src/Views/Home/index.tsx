// React Imports
import { FC, Fragment, useCallback, useMemo, useState } from "react";

// Global context Imports
import { useGlobalStore } from "@/context/global";

// Custom Component Imports
import CategoryCard from "@/components/CategoryCard";
import FolderCard from "@/components/FolderCard";

// Types Imports
import { ScreensTypes } from "@/enums";
import { ICategory } from "@/types/category.interface";
import { IFolder } from "@/types/folder.interface";

// Node package Imports
import { BsSearch } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

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
    setIsEditing,
  } = useGlobalStore();

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");

  const [dataLimit, setDataLimit] = useState<number>(2);

  const dataCount = folders.length + categories.length;

  console.log({ dataLimit, dataCount });

  /**
   * @description Filter categories based on query
   * @returns {ICategory[]} Filtered categories
   */
  const queryCategories = useMemo(
    () =>
      categories.filter((category: ICategory) =>
        category.name.toLowerCase().includes(query)
      ),
    [categories, query]
  );

  /**
   * @description Filter folders and categories based on query
   * @returns {IFolder[]} Filtered folders
   * @returns {ICategory[]} Filtered categories inside folders.
   */
  const queryFolders = useMemo(() => {
    return folders.filter((folder: IFolder) => {
      const folderNameMatch = folder.name.toLowerCase().includes(query);

      const categoryNamesMatch = folder.categories.some((category: ICategory) =>
        category.name.toLowerCase().includes(query)
      );

      return folderNameMatch || categoryNamesMatch;
    });
  }, [folders, query]);

  /**
   * @description Add Category to global state
   * @returns {void}
   */
  const addCategory = useCallback(() => {
    setCurrentScreen(ScreensTypes.CATEGORY);
    setIsEditing(false);
  }, [setCurrentScreen]);

  /**
   * @description Edit a Category in global state
   * @param {string} editType - The type of edit (e.g., 'edit' or 'add')
   * @param {number} itemId - The ID of the category to edit
   * @returns {void}
   */
  const editCategory = useCallback(
    (editType: string, itemId: string) => {
      setToEdit({ editType, itemId });
      setIsEditing(true);
      setCurrentScreen(ScreensTypes.CATEGORY);
    },
    [setToEdit, setCurrentScreen]
  );

  /**
   * @description Add Folder to global state
   * @returns {void}
   */
  const addFolder = useCallback(() => {
    setCurrentScreen(ScreensTypes.FOLDER);
    setIsEditing(false);
  }, [setCurrentScreen]);

  /**
   * @description Edit a Folder in global state
   * @param {string} editType - The type of edit (e.g., 'edit' or 'add')
   * @param {string} itemId - The ID of the folder to edit
   * @returns {void}
   */
  const editFolder = useCallback(
    (editType: string, itemId: string) => {
      setToEdit({ editType, itemId });
      setIsEditing(true);
      setCurrentScreen(ScreensTypes.FOLDER);
    },
    [setToEdit, setCurrentScreen]
  );

  /**
   * @description Delete a Folder from global state
   * @param {string} id - The ID of the folder to delete
   * @returns {void}
   */
  const deleteFolder = useCallback(
    (id: number) => {
      setFolders((prev: IFolder[]) =>
        prev.filter((folder: IFolder) => folder.id.toString() !== id.toString())
      );
      toast.success("Folder has been deleted!");
    },
    [setFolders, folders]
  );

  /**
   * @description Delete a Category from global state
   * @param {string} id - The ID of the category to delete
   * @returns {void}
   */
  const deleteCategory = useCallback(
    (id: number) => {
      setCategories((prev: ICategory[]) =>
        prev.filter(
          (category: ICategory) => category.id.toString() !== id.toString()
        )
      );
      toast.success("Category has been deleted!");
    },
    [setCategories, categories]
  );

  /**
   * @description Fetch more data and update the data limit in global state
   * @returns {void}
   */
  const fetchMore = useCallback(() => {
    setDataLimit((prev) => prev + 2);
  }, []);

  return (
    <Fragment>
      <InfiniteScroll
        dataLength={dataLimit} // This is important field to render the next data
        next={fetchMore}
        hasMore={dataLimit < dataCount}
        loader={dataLimit < dataCount ? <h4>Loading...</h4> : null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="w-screen h-full max-w-[390px] mx-auto mb-auto">
          {/* Body */}
          <div className="flex-col h-full pt-[18px] px-[20px]">
            <p className="font-bold text-secondary text-[28px] my-2">
              YOUR MENU
            </p>
            {isSearchActive ? (
              <input
                placeholder="Search here..."
                type="text"
                value={query}
                autoFocus={true}
                onChange={(e) => {
                  setQuery(e.currentTarget.value);
                }}
                className="border-2 border-secondary rounded-[15px] h-[37px] w-full bg-transparent focus:outline-none p-2"
              />
            ) : (
              <div
                onClick={() => setIsSearchActive(true)}
                className="flex flex-row justify-center gap-2 items-center border-2 border-secondary rounded-[15px] h-[37px]"
              >
                <BsSearch
                  color="#852E2C"
                  className="cursor-pointer"
                />
                <p className="text-secondary font-primary uppercase">
                  search menu
                </p>
              </div>
            )}

            <div
              className="flex flex-row gap-2 items-center mt-2 font-bold cursor-pointer"
              onClick={addFolder}
            >
              <svg
                viewBox="0 0 15 15"
                height={20}
              >
                <IoMdAddCircleOutline
                  color="#852E2C"
                  className="cursor-pointer"
                />
              </svg>
              <p className="text-secondary font-sans my-3">
                Create Category Folder
              </p>
            </div>

            {/* Menu Folders */}
            {queryFolders.map((folder: IFolder, idx: number) => {
              if (idx + 1 > dataLimit) return null;
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
              {queryCategories.map((category: ICategory, idx: number) => {
                // if (idx + 1 + folders.length > dataLimit) return null;
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

            {/* Add New Categories */}
            <div
              className="flex flex-col justify-center gap-2 items-center border-2 border-secondary rounded-[15px] h-[344px] px-2 cursor-pointer"
              style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 10%" }}
              onClick={addCategory}
            >
              <svg
                viewBox="0 0 15 15"
                height={50}
              >
                <IoMdAddCircleOutline color="#852E2C" />
              </svg>
              <p className="text-secondary font-monserrat font-semibold max-w-[192px] text-center mt-4">
                ADD NEW CATEGORY TO YOUR MENU
              </p>
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </Fragment>
  );
};

export default HomeView;
