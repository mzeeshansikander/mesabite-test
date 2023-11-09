// React Imports
import ActionButtons from "@/components/ActionButtons";
import { useGlobalStore } from "@/context/global";
import { Folders } from "@/data/foods";
import { ScreensTypes } from "@/enums";
import { Button } from "flowbite-react";
import Image from "next/image";
import {
  FC,
  Fragment,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const { folders, setFolders, setCurrentScreen, toEdit, isEditing } =
    useGlobalStore();

  const [image, setImage] = useState<string | null>(null);

  let fileInputRef = useRef(null);

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

    setFolders((prev: any) => [
      ...prev,
      {
        id: v4(),
        name: name,
        image:
          image ??
          "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
        categories: [
          {
            id: 1,
            name: "Added Pizza",
            description: "Added Folder Category description here!",
            image:
              image ??
              "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
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
    if (editFolder && isEditing) {
      selectedFolder = folders.filter(
        (folder: any) => folder.id === toEdit.itemId
      );
      setName(selectedFolder[0].name);

      setImage(selectedFolder[0].image);
    } else {
      setName("");

      setImage(null);
    }
  }, []);

  const updateFolder = () => {
    setFolders(
      folders.map((folder: any) => {
        if (folder.id === toEdit.itemId) {
          return { ...folder, name: name, image };
        }
        return folder;
      })
    );
    toast.success("Folder Updated!");

    setCurrentScreen(ScreensTypes.HOME);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setImage(event.target.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <div className="w-screen h-screen max-w-[390px] flex flex-col justify-start">
        {/* Body */}
        <div className="flex-col h-full pt-[18px] px-[20px] bg-[#FFF6DF]">
          <div className="flex flex-row justify-between items-center mt-[30px] mb-[17px]">
            <p className="font-bold text-secondary text-[20px] font-monserrat">
              {editFolder && isEditing
                ? "Edit Category Folder"
                : "Create New Category Folder"}
            </p>
            <svg viewBox="0 0 15 15" height={25} className="cursor-pointer">
              <MdCancel color="#852E2C" onClick={handleCancel} />
            </svg>
          </div>
          {!isEditing ? (
            <p className="text-[#BF5627] text-[12px] text-center font-monserrat">
              Here you can create Category Folder that
              <br />
              <strong>includes other categories under it.</strong>
            </p>
          ) : null}

          {/* Name Input Field  */}
          <div className="mb-[37px] mt-[17px]">
            <p className="font-semibold font-monserrat text-secondary">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              type="text"
              className="border-secondary h-[40px] my-2 bg-transparent border-2 rounded-full w-full font-monserrat"
            />
            <p className="text-[#BF5627] w-full text-right text-[10px] font-monserrat">
              {`${name.length}/50`}
            </p>
          </div>

          <p className="font-semibold font-monserrat text-secondary">
            Image (Optional)
          </p>

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={(fileInput: unknown | any) => (fileInputRef = fileInput)}
          />

          <div
            className="flex flex-col justify-center gap-2 items-center border-4 border-secondary rounded-[15px] h-[344px] px-2 my-2 cursor-pointer"
            style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 5%" }}
            onClick={() => {
              // @ts-ignore
              fileInputRef!.click();
            }}
          >
            {image ? (
              <Image
                src={image}
                alt="Uploaded Image"
                width={300}
                height={300}
              />
            ) : (
              <svg viewBox="0 0 16 16" height={80}>
                <BsUpload color="#852E2C" />
              </svg>
            )}
            <p className="text-secondary font-monserrat text-center mt-4 font-semibold">
              {image ? "Image uploaded" : "Click here to upload an image"}
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
