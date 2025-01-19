import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BookType } from '../@types'; // Define the BookType interface

interface CartContextType {
  cart: BookType[];
  addToCart: (book: BookType) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<BookType[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (Array.isArray(storedCart)) {
      setCart(storedCart);
    }
  }, []);



  const addToCart = (book: BookType) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((book) => book.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
