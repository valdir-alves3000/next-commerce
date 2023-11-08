import { ProductType } from "@/types/ProductType";

export const formatPrice = (price: number | null) => {
  if (!price) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);
};

export const calculateOrderAmount = (items: ProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  return totalPrice
}