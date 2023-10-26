import { ProductType } from "@/types/ProductType";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CardState = {
  cart: ProductType[],
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  isOpen: boolean;
  toggleCart: () => void
  onCheckout: 'cart' | 'checkout';
  setCheckout: (checkout: 'cart' | 'checkout') => void;
  paymentIntent: string,
  setPaymentIntent: (paymentIntent: string) => void;
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
      removeProduct: (item) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === item.id);

          if (existingProduct && existingProduct.quantity! > 1) {
            const updatedCart = state.cart.map((p) => {
              if (p.id === item.id) {
                return { ...p, quantity: p.quantity! - 1 };
              }
              return p;
            });
            return { cart: updatedCart };
          }

          const filterdCart = state.cart.filter((p) => p.id !== item.id);
          return { cart: filterdCart };
        }),
      isOpen: false,
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      onCheckout: "cart",
      setCheckout: (checkout) => set({ onCheckout: checkout }),
      paymentIntent: "",
      setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent })),
    }),
    { name: "cart-storage" }
  )
);