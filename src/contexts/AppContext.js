"use client";

import { useState, useEffect, useContext, createContext } from "react";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const handleAddToFavorites = (name, image, _id) => {
    setFavorites(prev => {

      if (prev.some(f => f._id ===_id)) {
        return prev.filter(f => f._id !==_id);
      }

      return [...prev, { name, image, _id }];
    });
  };

  const favoritesQty = () => favorites.length;

  return (
    <AppContext.Provider
      value={{
        favorites,
        handleAddToFavorites,
        favoritesQty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};

export default AppContext;