// React Imports
import {
  FC,
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

// Next JS Imports
import Image from "next/image";

// Node package Imports
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { BsUpload } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

// Component Imports
import ActionButtons from "@/components/ActionButtons";

// Context Imports
import { useGlobalStore } from "@/context/global";

// Type Imports
import { ScreensTypes } from "@/enums";
import { ICategory } from "@/types/category.interface";
import { IFolder } from "@/types/folder.interface";

interface AddProps {}

const AddView: FC<AddProps> = () => {
  const { folders, setFolders, setCurrentScreen, toEdit, isEditing } =
    useGlobalStore();

  const editFolder = toEdit?.editType === "folder";

  const [name, setName] = useState<string>("");

  const [image, setImage] = useState<string | null>(null);

  let fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * @description Cancel the current action and navigate to the home screen
   * @returns {void}
   */
  const handleCancel = useCallback(() => {
    setCurrentScreen(ScreensTypes.HOME);
  }, [setCurrentScreen]);

  /**
   * @description Save a new Folder to global state and navigate to the home screen
   * @returns {void}
   */
  const handleSave = useCallback(() => {
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
          image ||
          "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
        categories: [
          {
            id: 1,
            name: "Added Pizza",
            description: "Added Folder Category description here!",
            image:
              image ||
              "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
            items: [],
            folder: 101,
          },
        ],
      },
    ]);
    toast.success("Folder Added Successfully!");

    setCurrentScreen(ScreensTypes.HOME);
  }, [name, image, setFolders, toast, setCurrentScreen]);

  /**
   * @description Update an existing Folder in global state and navigate to the home screen
   * @returns {void}
   */
  const updateFolder = useCallback(() => {
    if (!name) {
      toast.error("Please type Folder Name");
      return;
    }
    setFolders((prev: any) => {
      return prev.map((folder: IFolder) => {
        if (folder.id.toString() === toEdit.itemId.toString()) {
          return {
            ...folder,
            name: name,
            image,
            categories: folder.categories.map((category: ICategory) => {
              return { ...category, image: image };
            }),
          };
        }
        return folder;
      });
    });
    toast.success("Folder Updated!");
    setCurrentScreen(ScreensTypes.HOME);
  }, [name, image, setFolders, toast, setCurrentScreen, toEdit.itemId]);

  // const updateFolder = () => {
  //   if (!name) {
  //     toast.error("Please type Folder Name");
  //     return;
  //   }
  //   setFolders(
  //     folders.map((folder: IFolder) => {
  //       if (folder.id === toEdit.itemId) {
  //         return {
  //           ...folder,
  //           name: name,
  //           image,
  //           categories: folder.categories.map((category: ICategory) => {
  //             return { ...category, image: image };
  //           }),
  //         };
  //       }
  //       return folder;
  //     });
  //   });

  /**
   * @description Handle image upload and set the image for a new or edited Folder
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event with uploaded files
   * @returns {void}
   */
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          setImage(event.target.result as string);
        };

        reader.readAsDataURL(file);
      }
    },
    []
  );

  /**
   * @description Get the selected folder for editing using memoization
   * @returns {object | null} - The selected folder or null if not found
   */
  const selectedFolder = useMemo(() => {
    if (editFolder && isEditing) {
      return folders.find(
        (folder: any) => folder.id.toString() === toEdit.itemId.toString()
      );
    }
    return null;
  }, [editFolder, isEditing, folders, toEdit.itemId]);

  useEffect(() => {
    if (selectedFolder) {
      setName(selectedFolder.name);
      setImage(selectedFolder.image);
    } else {
      setName("");
      setImage(null);
    }
  }, [selectedFolder]);

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
            <svg
              viewBox="0 0 15 15"
              height={25}
              className="cursor-pointer"
            >
              <MdCancel
                color="#852E2C"
                onClick={handleCancel}
              />
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
              required
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
            ref={fileInputRef}
          />

          <div
            className="flex flex-col justify-center gap-2 items-center border-4 border-secondary rounded-[15px] h-[344px] px-2 my-2 cursor-pointer"
            style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 5%" }}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            {image ? (
              <Image
                priority={true}
                src={image}
                alt="Uploaded Image"
                width={300}
                height={300}
              />
            ) : (
              <svg
                viewBox="0 0 16 16"
                height={80}
              >
                <BsUpload color="#852E2C" />
              </svg>
            )}
            <p className="text-secondary font-monserrat text-center mt-4 font-semibold">
              {image ? "Upload new image" : "Click here to upload an image"}
            </p>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <ActionButtons
          handleCancel={handleCancel}
          handleSave={editFolder && isEditing ? updateFolder : handleSave}
        />
      </div>
    </Fragment>
  );
};

export default AddView;
