
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  cartId: string;
  name: string;
  collection: string;
  size: string;
  color: string;
  price: string;
  priceValue: number;
  image: string;
  objectPosition: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cartId' | 'quantity'>) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('db_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('db_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'cartId' | 'quantity'>) => {
    setItems(prev => {
      // Check if exact same product (id + size + color) exists
      const existingIndex = prev.findIndex(
        item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      );

      if (existingIndex > -1) {
        const updatedItems = [...prev];
        updatedItems[existingIndex].quantity += 1;
        return updatedItems;
      }

      return [...prev, { ...newItem, cartId: `${newItem.id}-${newItem.size}-${newItem.color}-${Date.now()}`, quantity: 1 }];
    });
  };

  const removeItem = (cartId: string) => {
    setItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
