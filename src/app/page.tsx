import { Product } from "@/app/components/Product";
import { ProductType } from "@/types/ProductType";
import Stripe from "stripe";

async function getProducts() {
  const stripe = new Stripe(process.env.STRIP_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  const products = await stripe.products.list();
  const formatedProducts = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.list({
        product: product.id,
      });

      return {
        id: product.id,
        price: price.data[0].unit_amount,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currenty: price.data[0].currency,
      };
    })
  );

  return formatedProducts;
}

export default async function Home() {
  const products = await getProducts();

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
