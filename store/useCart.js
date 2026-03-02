// store/useCart.js
import { create } from "zustand";

const useCart = create((set) => ({
  items: [],
  totalItems: 0,

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      totalItems: state.totalItems + 1,
    })),

  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      return {
        items: updatedItems,
        totalItems: updatedItems.length,
      };
    }),

  clearCart: () => set({ items: [], totalItems: 0 }),
}));

export default useCart;
