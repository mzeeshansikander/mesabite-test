// React Import
import { Categories, Folders } from "@/data/foods";
import { ICategory } from "@/types/category.interface";
import { IFolder } from "@/types/folder.interface";
import React, { createContext, useContext, useState } from "react";

interface GlobalContextType {
  categories: any;
  setCategories: (categories: any) => void;
  folders: any;
  setFolders: (folders: any) => void;
  currentScreen: any;
  setCurrentScreen: (currentScreen: any) => void;
  toEdit: any;
  setToEdit: (toEdit: any) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const Context = createContext<GlobalContextType | undefined>(undefined);

const GlobalStore = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<ICategory[]>(Categories);

  const [folders, setFolders] = useState<any>(Folders);

  const [currentScreen, setCurrentScreen] = useState<string>("home");

  const [toEdit, setToEdit] = useState<any>();

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
