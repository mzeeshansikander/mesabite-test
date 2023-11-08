// React Imports
import ActionButtons from "@/components/ActionButtons";
import { useGlobalStore } from "@/context/global";
import { Folders } from "@/data/foods";
import { ScreensTypes } from "@/enums";
import { Button } from "flowbite-react";
import Image from "next/image";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { BsChevronDown, BsUpload } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

// For ID
import { v4 } from "uuid";

// Functions Import

interface AddProps {}

const AddView: FC<AddProps> = () => {
  // States
  const [name, setName] = useState<string>("");

  const { folders, setFolders, setCurrentScreen, toEdit } = useGlobalStore();

  console.log(toEdit);

  // Form Cancel Handler
  const handleCancel = () => {
    setCurrentScreen(ScreensTypes.HOME);
  };

  // Form Save Handler
  const handleSave = () => {
    if (!name) {
      toast.error("Please type Folder Name");
      return;
    }
    console.log("Saving...");
    setFolders((prev: any) => [
      ...prev,
      {
        id: v4(),
        name: name,
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
    toast.success("Folder Added Successfully!");
    setCurrentScreen(ScreensTypes.HOME);
  };

  const editFolder = toEdit?.editType === "folder";
  let selectedFolder;

  useEffect(() => {
    if (editFolder) {
      selectedFolder = folders.filter(
        (folder: any) => folder.id === toEdit.itemId
      );
      setName(selectedFolder[0].name);
    }
  }, []);

  const updateFolder = () => {
    setFolders(
      folders.map((folder: any) => {
        if (folder.id === toEdit.itemId) {
          return { ...folder, name: name };
        }
        return folder;
      })
    );
    toast.success("Folder Updated!");
    setCurrentScreen(ScreensTypes.HOME);
  };

  return (
    <Fragment>
      <div className="w-screen h-screen max-w-[390px] flex flex-col justify-start">
        {/* Body */}
        <div className="flex-col h-full pt-[18px] px-[20px] bg-[#FFF6DF]">
          <div className="flex flex-row justify-between items-center mt-[30px] mb-[17px]">
            <p className="font-bold text-[#852E2C] text-[20px] font-monserrat">
              {editFolder
                ? "Edit Category Folder"
                : "Create New Category Folder"}
            </p>
            <svg viewBox="0 0 15 15" height={25} className="cursor-pointer">
              <MdCancel color="#852E2C" onClick={handleCancel} />
            </svg>
          </div>
          {!editFolder && (
            <p className="text-[#BF5627] text-[12px] text-center font-monserrat">
              Here you can create Category Folder that
              <br />
              <strong>includes other categories under it.</strong>
            </p>
          )}

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

          <p className="font-semibold font-monserrat text-[#852E2C]">
            Image (Optional)
          </p>

          <div
            className="flex flex-col justify-center gap-2 items-center border-4 border-[#852E2C] rounded-[15px] h-[344px] px-2 my-2"
            style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 5%" }}
            // style={{
            //   clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 9% 96%, 0% 38%)",
            // }}
          >
            <svg viewBox="0 0 16 16" height={80}>
              <BsUpload color="#852E2C" />
            </svg>
            <p className="text-[#852E2C] font-monserrat text-center mt-4 font-semibold">
              Click here to upload an image
            </p>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <ActionButtons
          handleCancel={handleCancel}
          handleSave={editFolder ? updateFolder : handleSave}
        />
      </div>
    </Fragment>
  );
};

export default AddView;
