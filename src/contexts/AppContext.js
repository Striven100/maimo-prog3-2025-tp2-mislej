"use client";

import { useState, useEffect, useContext, createContext } from "react";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [Carrito, setCarrito] = useState([]);

  useEffect(() => {
    console.log(Carrito);
  }, [Carrito]);

  const handleAddToCarrito = (name, image, _id) => {
    setCarrito(prev => {

      if (prev.some(f => f._id ===_id)) {
        return prev.filter(f => f._id !==_id);
      }

      return [...prev, { name, image, _id }];
    });
  };

  const CarritoQty = () => Carrito.length;

  return (
    <AppContext.Provider
      value={{
        Carrito,
        handleAddToCarrito,
        CarritoQty,
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