import { formatPrice } from "@/lib/utils";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";
import { AddCart } from "./AddCart";
import { ProductImage } from "./ProductImage";

type ProductProps = {
  product: ProductType;
};

export function Product({ product }: ProductProps) {
  return (
    <div className="flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300 rounded">
      <Link
        href={`/product/${product.id}`}
        className="relative max-h-72 flex-1 rounded overflow-hidden"
      >
        <ProductImage product={product} fill />
      </Link>
      <div className="flex justify-between font-bold my-3">
        <p className="w-40 truncate">{product.name}</p>
        <p className="text-md text-teal-300">{formatPrice(product.price)}</p>
      </div>
      <AddCart product={product} key={product.id} />
    </div>
  );
}
