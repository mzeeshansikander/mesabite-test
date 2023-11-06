// React Import
import React, { createContext, useContext, useState } from "react";

interface GlobalContextType {
  restaurant: any;
  setRestaurant: (restaurant: any) => void;
}

const Context = createContext<GlobalContextType | undefined>(undefined);

const GlobalStore = ({ children }: { children: React.ReactNode }) => {
  const [restaurant, setRestaurant] = useState(null);

  return (
    <Context.Provider value={{ restaurant, setRestaurant }}>
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
