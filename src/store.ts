import { ProductType } from "@/types/ProductType";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CardState = {
  cart: ProductType[],
  // addToCart: (product: ProductType) => void;
  // removeFromCart: (productId: string) => void;
  isOpen: boolean;
  toggleCart: () => void
}

export const useCartStore = create<CardState>()(
  persist(
    set => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set(state => ({ isOpen: !state.isOpen }))
    }),
    { name: "cart-storage" }
  )
);