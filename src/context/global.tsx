// React Import
import { Categories, Folders } from "@/data/foods";
import { ScreensTypes } from "@/enums";
import { ICategory } from "@/types/category.interface";
import { IFolder } from "@/types/folder.interface";
import React, { createContext, useContext, useState } from "react";

interface IToEdit {
  editType: string;
  itemId: string;
}
interface GlobalContextType {
  categories: ICategory[];
  setCategories: Function;
  folders: IFolder[] | any[];
  setFolders: Function;
  currentScreen: ScreensTypes;
  setCurrentScreen: (currentScreen: ScreensTypes) => void;
  toEdit: IToEdit;
  setToEdit: (toEdit: IToEdit) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const Context = createContext<GlobalContextType | undefined>(undefined);

const GlobalStore = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<ICategory[]>(Categories);

  const [folders, setFolders] = useState<IFolder[] | any[]>(Folders);

  const [currentScreen, setCurrentScreen] = useState<ScreensTypes>(
    ScreensTypes.HOME
  );

  const [toEdit, setToEdit] = useState<IToEdit>({
    editType: "",
    itemId: "",
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        folders,
        setFolders,
        currentScreen,
        setCurrentScreen,
        toEdit,
        setToEdit,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to use the context
export const useGlobalStore = (): GlobalContextType => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useGlobalStore must be used within a GlobalStore provider"
    );
  }
  return context;
};

export default GlobalStore;
