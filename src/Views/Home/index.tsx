// React Imports
import { Button } from "flowbite-react";
import Image from "next/image";
import { FC, Fragment, useContext, useEffect, useState } from "react";
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

// Functions Import

interface HomeProps {}

const HomeView: FC<HomeProps> = () => {
  const { folders, setFolders, categories, setCategories } = useGlobalStore();
  // const [cats, setCats] = useState<any>(Categories);
  // const [folders, setFolders] = useState<any>(Folders);

  // update Categories State
  // useEffect(() => {
  //   contextStore.setCategories(Categories);
  // }, []);

  // useEffect(() => {
  //   setCats(contextStore.categories);
  //   setFolders(contextStore.folders);
  // }, [contextStore]);

  // If items found in the database
  const [haveItems, setHaveItems] = useState<boolean>(true);

  const addMore = () => {
    setCategories((prev: any) => [
      ...prev,
      {
        id: v4(),
        name: "Added",
        description: "Yup is description of the Sandwitches normal category.",
        image: "www.example.com/pasta",
        items: [1, 2, 3, 1, 2, 1, 2],
      },
    ]);
  };

  const addFolder = () => {
    setFolders((prev: any) => [
      ...prev,
      {
        id: v4(),
        name: "Added Folder",
        description: "All Categories goes here...",
        image: "www.example.com/foods",
        categories: [
          {
            id: 1,
            name: "Added Pizza",
            description: "Added Folder Category descriotion here!",
            image: "www.example.com/pasta",
            items: [],
            folder: 101,
          },
        ],
      },
    ]);
  };

  const deleteFolder = (id: string) => {
    setFolders((prev: any) => prev.filter((folder: any) => folder.id !== id));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev: any) =>
      prev.filter((category: any) => category.id !== id)
    );
  };

  // const [message, setMessage] = useContext(useGlobalStore)
  return (
    <Fragment>
      <div className="w-screen max-w-[390px] flex flex-col justify-start">
        {/* Body */}
        <div className="flex-col h-full pt-[18px] px-[20px]">
          <p className="font-bold text-[#852E2C] text-[28px] my-2">YOUR MENU</p>
          <div className="flex flex-row justify-center gap-2 items-center border-2 border-[#852E2C] rounded-[15px] h-[37px]">
            <BsSearch color="#852E2C" />
            <p className="text-[#852E2C] font-sans">SEARCH MENU</p>
          </div>

          <div
            className="flex flex-row gap-2 items-center mt-2 font-bold cursor-pointer"
            onClick={addFolder}
          >
            <svg viewBox="0 0 15 15" height={20}>
              <IoMdAddCircleOutline color="#852E2C" />
            </svg>
            <p className="text-[#852E2C] font-sans my-3">
              Create Category Folder
            </p>
          </div>

          {/* Menu Folders */}
          {folders.map((folder: any, idx: number) => (
            <div
              key={`${folder.id} ${idx}`}
              className="border-[3px] border-[#852E2C] rounded-[10px] p-3 my-3"
            >
              {/* Folder Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex felx-row items-center">
                  <AiOutlineMenu className="text-[#852E2C] font-bold" />
                  <p className="font-bold text-[20px] mx-2 text-[#852E2C]">
                    {folder.name}
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  <IoMdSettings color="#852E2C" />
                  <MdModeEdit color="#852E2C" />
                  <MdDelete
                    color="#852E2C"
                    onClick={() => deleteFolder(folder.id)}
                  />
                </div>
              </div>

              {/* Folder Categories */}
              {folder.categories.map((category: any, idx: number) => (
                <div
                  key={`${category.id} ${idx}`}
                  className="flex flex-col border-[#852E2C] rounded-[5px] h-[274px] relative"
                  style={{ backgroundImage: `${img}` }}
                >
                  <Image
                    src={img}
                    alt=""
                    // layout="fill"
                    width={0}
                    height={0}
                    // style={{ position: "fixed" }}
                  />
                  <div className="flex flex-col w-full absolute bottom-6 px-4">
                    <div className="flex items-center justify-between mb-1 w-full">
                      <div className="bg-[#FFCD00] rounded-full flex flex-row w-max p-1 px-3 items-center">
                        <p className="text-[10px] text-[#852E2C]">{`${category.items.length} items`}</p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <IoMdSettings color="#FFFFFF" />
                        <MdModeEdit color="#FFFFFF" />
                        <MdDelete color="#FFFFFF" />
                      </div>
                    </div>

                    <p className="text-white font-sans">{category.name}</p>
                    <p className="text-white  font-sans text-[10px]">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* All Categories */}
          <div className="px-3 my-4">
            {categories?.map((category: any) => (
              <div
                key={category.id}
                className="flex flex-col border-[#852E2C] rounded-[5px] h-[274px] relative"
                style={{ backgroundImage: `${img}` }}
              >
                <Image
                  src={img}
                  alt=""
                  // layout="fill"
                  width={0}
                  height={0}
                  // style={{ position: "fixed" }}
                />
                <div className="flex flex-col w-full absolute bottom-6 px-4">
                  <div className="flex items-center justify-between mb-1 w-full">
                    <div className="bg-[#FFCD00] rounded-full flex flex-row w-max p-1 px-3 items-center">
                      <p className="text-[10px] text-[#852E2C]">{`${category.items.length} items`}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <IoMdSettings color="#FFFFFF" />
                      <MdModeEdit color="#FFFFFF" />
                      <MdDelete
                        color="#FFFFFF"
                        onClick={() => deleteCategory(category.id)}
                      />
                    </div>
                  </div>

                  <p className="text-white font-sans">{category.name}</p>
                  <p className="text-white  font-sans text-[10px] mt-1">
                    {category.description.length > 50
                      ? category.description.slice(0, 50) + "..."
                      : category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Ad New Categories */}
          <div
            className="flex flex-col justify-center gap-2 items-center border-2 border-[#852E2C] rounded-[15px] h-[344px] px-2"
            style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 10%" }}
            onClick={addMore}
          >
            <svg viewBox="0 0 15 15" height={50}>
              <IoMdAddCircleOutline color="#852E2C" />
            </svg>
            <p className="text-[#852E2C] font-sans max-w-[192px] text-center mt-4">
              ADD NEW CATEGORY TO YOUR MENU
            </p>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        {/* <div className="flex flex-row justify-center gap-3 items-center p-2 bg-orange-300 h-[92px]">
          <Button className="bg-[#852E2C] text-white h-[50px] w-[150px]">
            Cancel
          </Button>
          <Button className="bg-[#FFCD00] text-[#852E2C] h-[50px] w-[150px]">
            Save
          </Button>
        </div> */}
      </div>
    </Fragment>
  );
};

export default HomeView;
