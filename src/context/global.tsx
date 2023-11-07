// React Import
import { Categories, Folders } from "@/data/foods";
import React, { createContext, useContext, useState } from "react";

interface GlobalContextType {
  categories: any;
  setCategories: (categories: any) => void;
  folders: any;
  setFolders: (folders: any) => void;
}

const Context = createContext<GlobalContextType | undefined>(undefined);

const GlobalStore = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState(Categories);
  const [folders, setFolders] = useState(Folders);

  return (
    <Context.Provider
      value={{ categories, setCategories, folders, setFolders }}
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
