"use client";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CheckoutButtonProps = {
  totalPrice: number;
};

export function CheckoutButton({ totalPrice }: CheckoutButtonProps) {
  const router = useRouter();
  const { user } = useUser();
  const useStore = useCartStore();

  const handleCheckout = async () => {
    if (!user) {
      useStore.toggleCart();
      router.push("/sign-in?redirectUrl=/");
      return;
    }
    useStore.setCheckout("checkout");
  };

  return (
    <div>
      <p className="text-teal-600 font-bold">
        Total: {formatPrice(totalPrice)}
      </p>
      <button
        onClick={handleCheckout}
        className="w-full rounded-md bg-teal-600 text-white py-2 mt-2"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
