// React Imports
import ActionButtons from "@/components/ActionButtons";
import { useGlobalStore } from "@/context/global";
import { ScreensTypes } from "@/enums";
import { ICategory } from "@/types/category.interface";
import Image from "next/image";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

// For ID
import { v4 } from "uuid";

// Functions Import

interface IPropTypes {}

const CategoryView: FC<IPropTypes> = () => {
  // States
  const [name, setName] = useState<string>("");

  const [desc, setDesc] = useState<string>("");

  const { categories, setCategories, setCurrentScreen, toEdit, isEditing } =
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
      toast.error("Please type Category Name");
      return;
    }
    setCategories((prev: ICategory[]) => [
      ...prev,
      {
        id: v4(),
        name: name,
        description: desc,
        image:
          image ??
          "https://nahaj-testing.s3.amazonaws.com/temp/1699496557411.png",
        items: [],
      },
    ]);
    toast.success("Category Added Successfully!");

    setCurrentScreen(ScreensTypes.HOME);
  };

  const editCategory = toEdit?.editType === "category";
  let selectedCategory;

  useEffect(() => {
    if (editCategory && isEditing) {
      selectedCategory = categories.filter(
        (category: ICategory) => category.id === toEdit.itemId
      );

      setImage(selectedCategory[0].image);

      setName(selectedCategory[0].name);

      setDesc(selectedCategory[0].description);
    } else {
      setImage(null);

      setName("");

      setDesc("");
    }
  }, []);

  const updateCategory = () => {
    setCategories(
      categories.map((category: ICategory) => {
        if (category.id === toEdit.itemId) {
          return { ...category, name: name, description: desc, image };
        }
        return category;
      })
    );
    toast.success("Category Updated!");
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
            {isEditing ? (
              <p className="font-bold text-secondary text-[20px]">
                Edit Category
              </p>
            ) : (
              <p className="font-bold text-secondary text-[20px]">
                Add New Category
              </p>
            )}
            <svg viewBox="0 0 15 15" height={25}>
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
          {/* <div
            className="flex flex-col justify-center gap-2 items-center border-4 border-secondary rounded-[15px] h-[344px] px-2 my-2"
            style={{ borderRadius: "10% 90% 10% 90% / 95% 8% 92% 5%" }}
          >
            <svg viewBox="0 0 16 16" height={80}>
              <BsUpload color="#852E2C" />
            </svg>
            <p className="text-secondary font-monserrat text-center mt-4 font-semibold">
              Click here to upload an image
            </p>
          </div> */}

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

          {/* Description Input Field  */}
          <div className="mb-[37px] mt-[17px]">
            <p className="font-semibold font-monserrat text-secondary">
              {`Description (Optional)`}
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
          handleSave={editCategory ? updateCategory : handleSave}
        />
      </div>
    </Fragment>
  );
};

export default CategoryView;
