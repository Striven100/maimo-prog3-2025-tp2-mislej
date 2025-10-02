"use client";

import { useState, useEffect, useContext, createContext } from "react";
const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
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
    <ShopContext.Provider
      value={{
        Carrito,
        handleAddToCarrito,
        CarritoQty,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
};

export default ShopContext;