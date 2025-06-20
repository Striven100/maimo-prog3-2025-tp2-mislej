"use client";

import { useState, useEffect, useContext, createContext } from "react";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const handleAddToFavorites = (title, image, id) => {
    setFavorites(prev => {

      if (prev.some(f => f.id === id)) {
        return prev.filter(f => f.id !== id);
      }

      return [...prev, { title, image, id }];
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