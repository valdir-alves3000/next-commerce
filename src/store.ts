import { ProductType } from "@/types/ProductType";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CardState = {
  cart: ProductType[],
  addProduct: (product: ProductType) => void;
  // removeFromCart: (productId: string) => void;
  isOpen: boolean;
  toggleCart: () => void
}

export const useCartStore = create<CardState>()(
  persist(
    set => ({
      cart: [],
      addProduct: (item) =>
        set((state) => {
          const productIndex = state.cart.findIndex((p) => p.id === item.id);

          if (productIndex !== -1) {
            const updatedCart = state.cart.map((p, index) =>
              index === productIndex
                ? { ...p, quantity: (p.quantity || 0) + 1 }
                : p
            );
            return { cart: updatedCart };
          }

          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      isOpen: false,
      toggleCart: () => set(state => ({ isOpen: !state.isOpen }))
    }),
    { name: "cart-storage" }
  )
);