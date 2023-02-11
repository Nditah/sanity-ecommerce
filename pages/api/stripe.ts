import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}


const stripeClient = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, { apiVersion: '2020-08-27' });
const projectId = `${process.env.NEXT_PUBLIC_SANITY_PROJECTID}`

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if (req.method === 'POST') {
        try {
            const cartItems: CartItem[] = req.body.cartItems
            const options: Stripe.Checkout.SessionCreateParams = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1MaMttJK0WO7QukhVkwn8lZ2' },
                    { shipping_rate: 'shr_1MaMukJK0WO7QukhvH6vT8Zd' },
                ],
                line_items: cartItems.map((item) => {
                    const img = item.image[0].asset._ref
                    const newImage = img.replace('image-', `https://cdn.sanity.io/images/${projectId}/production/`).replace('-webp', '.webp')
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: { name: item.name, images: [newImage] },
                            unit_amount: item.price * 100, // In Cents
                        },
                        adjustable_quantity: { enabled: true, minimum: 1 },
                        quantity: item.quantity,
                    } 
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/?cancel=true`,
              };

              const session = await stripeClient.checkout.sessions.create(options)
              console.log(session)
              return res.status(200).json(session)

        } catch (error) {
            console.error(error, '\nreq.body =>', req.body)
            return res.status(500).json({ message: 'Error processing request' })
        }
    }
  }
