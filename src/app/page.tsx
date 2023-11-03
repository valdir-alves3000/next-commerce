import { Product } from "@/app/components/Product";
import { ProductType } from "@/types/ProductType";
import { fetchProducts } from "./actions";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="max-w-7xl mx-auto pt-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    </div>
  );
}
