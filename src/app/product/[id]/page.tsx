import { AddCart } from "@/app/components/AddCart";
import { ProductImage } from "@/app/components/ProductImage";
import { formatPrice } from "@/lib/utils";
import Stripe from "stripe";

type ProductDetailsProps = {
  params: {
    id: string;
  };
};

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIP_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  const product = await stripe.products.retrieve(id);
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
}

export default async function ProductDetails({
  params: { id },
}: ProductDetailsProps) {
  const product = await getProduct(id);

  return (
    <div className="max-w-7xl flex flex-col items-center mx-auto gap-8 p-10 md:flex-row lg:justify-around">
      <ProductImage product={product} />
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-gray-300">{product.name}</h1>
          <h2 className="text-xl text-teal-600 font-bold">
            {formatPrice(product.price)}
          </h2>
        </div>
        <div className="pb-4">
          <p className="text-sm text-gray-400">{product.description}</p>
        </div>
        <AddCart product={product} key={product.id} />
      </div>
    </div>
  );
}
