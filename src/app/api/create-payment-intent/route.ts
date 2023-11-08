import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { calculateOrderAmount } from "@/lib/utils";
import { ProductType } from "@/types/ProductType";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId, user } = auth()
  const { items, payment_intent_id } = await req.json()

  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const customerIdTemp = "cus_OwcFQ9Js1ibxIa"
  const totalPrice = calculateOrderAmount(items)

  const orderData = {
    user: { connect: { id: 1 } },
    amount: totalPrice,
    currenty: 'brl',
    status: 'pending',
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item: ProductType) => ({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }))
    }
  }

  console.log(user)

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
        amount: totalPrice
      })

      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentID: payment_intent_id },
          include: { products: true }
        }),
        prisma.order.update({
          where: { paymentIntentID: payment_intent_id },
          data: {
            amount: totalPrice,
            products: {
              deleteMany: {},
              create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image
              }))
            }
          }
        })
      ])


      if (!existing_order) {
        return new Response("Order not found!", { status: 404 })
      }

      return Response.json({ paymentIntent: updated_order }, { status: 200 })
    }
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'brl',
    automatic_payment_methods: { enabled: true }
  })

  orderData.paymentIntentID = paymentIntent.id
  const newOrder = await prisma.order.create({
    data: orderData
  })

  return Response.json({ paymentIntent }, { status: 200 })
}