// React Imports
import { FC, Fragment, useEffect, useRef, useState, useCallback } from "react";

// Next JS Imports
import Image from "next/image";

// Component Imports
import ActionButtons from "@/components/ActionButtons";

// Context Imports
import { useGlobalStore } from "@/context/global";

// Type Imports
import { ScreensTypes } from "@/enums";
import { ICategory } from "@/types/category.interface";

// Node package Imports
import { BsUpload } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

interface IPropTypes {}

const CategoryView: FC<IPropTypes> = () => {
  const { categories, setCategories, setCurrentScreen, toEdit, isEditing } =
    useGlobalStore();

  const [name, setName] = useState<string>("");

  const [desc, setDesc] = useState<string>("");

  const [image, setImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editCategory = toEdit?.editType === "category";

  /**
   * @description Save a new Category to global state and navigate to the home screen
   * @returns {void}
   */
  const handleSave = useCallback(() => {
    if (!name || !desc || !image) {
      toast.error("Please fill all the fields");
      return;
    }

    const newCategory = {
      id: uuidv4(),
      name,
      description: desc,
      image:
        image ||
        "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
      items: [],
    };

    setCategories((prevCategories: ICategory[]) => [
      ...prevCategories,
      newCategory,
    ]);
    toast.success("Category Added Successfully!");

    setCurrentScreen(ScreensTypes.HOME);
  }, [name, desc, image, setCurrentScreen, setCategories]);

  /**
   * @description Handle image upload and set the image for a new Category
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event with uploaded files
   * @returns {void}
   */
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e?.target?.files?.length) return;

      const file = e?.target?.files[0] as File;

      if (file) {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          setImage(event.target?.result as string);
        };

        reader.readAsDataURL(file);
      }
    },
    []
  );

  /**
   * @description Update an existing Category in global state and navigate to the home screen
   * @returns {void}
   */
  const updateCategory = useCallback(() => {
    if (!name || !desc || !image) {
      toast.error("Please fill all the fields");
      return;
    }

    setCategories((prevCategories: ICategory[]) => {
      return prevCategories.map((category: ICategory) => {
        if (category.id.toString() === toEdit.itemId.toString()) {
          return { ...category, name, description: desc, image };
        }
        return category;
      });
    });

    toast.success("Category Updated!");
    setCurrentScreen(ScreensTypes.HOME);
  }, [name, desc, image, toEdit.itemId, setCategories, setCurrentScreen]);

  /**
   * @description Cancel the current action and navigate to the home screen
   * @returns {void}
   */
  const handleCancel = useCallback(() => {
    setCurrentScreen(ScreensTypes.HOME);
  }, [setCurrentScreen]);

  useEffect(() => {
    if (editCategory && isEditing) {
      const selectedCategory = categories.find(
        (category: ICategory) =>
          category.id.toString() === toEdit.itemId.toString()
      );

      if (selectedCategory) {
        setImage(selectedCategory.image);
        setName(selectedCategory.name);
        setDesc(selectedCategory.description);
      }
    } else {
      setImage(null);
      setName("");
      setDesc("");
    }
  }, []);

  return (
    <Fragment>
      <div className="w-screen h-screen max-w-[390px] flex flex-col justify-start">
        {/* Body */}
        <div className="flex-col h-full pt-[18px] px-[20px] bg-[#FFF6DF] mb-10">
          <div className="flex flex-row justify-between items-center mt-[30px] mb-[17px]">
            <p className="font-bold text-secondary text-[20px]">
              {isEditing ? "Edit Category" : "Add New Category"}
            </p>
            <svg
              viewBox="0 0 15 15"
              height={25}
            >
              <MdCancel
                color="#852E2C"
                onClick={handleCancel}
                className="cursor-pointer"
              />
            </svg>
          </div>

          {/* Select Image Box */}
          <p className="font-semibold font-monserrat text-secondary">
            Image (Optional)
          </p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={(fileInput) => (fileInputRef.current = fileInput)}
          />

          <div
            className="flex flex-col justify-center gap-2 items-center border-4 border-secondary rounded-[15px] h-[344px] px-2 my-2 cursor-pointer"
            style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 5%" }}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            {image ? (
              <div className="max-h-[250px] max-w-[250px] z-0 border-2 border-[#852E2C] rounded">
                <Image
                  priority={true}
                  src={image}
                  alt="Uploaded Image"
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
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

          {/* Name Input Field */}
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

          {/* Description Input Field */}
          <div className="mb-[37px] mt-[17px]">
            <p className="font-semibold font-monserrat text-secondary">
              Description (Optional)
            </p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.currentTarget.value)}
              aria-rowcount={10}
              className="border-secondary h-[192px] my-2 bg-transparent border-2 rounded-3xl w-full font-monserrat"
            />
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <ActionButtons
          handleCancel={handleCancel}
          handleSave={editCategory && isEditing ? updateCategory : handleSave}
        />
      </div>
    </Fragment>
  );
};

export default CategoryView;
