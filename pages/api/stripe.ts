import Stripe from 'stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}


const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, { apiVersion: '2020-08-27' });

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    if (req.method === 'POST') {
        try {
            const options = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: '' },
                ],
                line_items: [
                  {
                    name: 'My Product',
                    description: 'A description of my product',
                    amount: 1000, // 10.00 USD in cents
                    currency: 'usd',
                    quantity: 1,
                  },
                ],
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cancel`,
              };

        } catch (error) {
            console.error(error)
        }
    }
    res.status(200).json({ name: 'John Doe' })
  }
