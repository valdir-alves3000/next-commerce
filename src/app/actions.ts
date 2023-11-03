'use server'

import { stripe } from '@/lib/stripe';

export async function fetchProducts() {
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