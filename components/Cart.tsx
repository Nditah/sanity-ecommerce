import React, { useRef, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai'
import { TfiAngleDoubleLeft, TfiAngleDoubleRight } from 'react-icons/tfi'
import { TiDeleteOutline} from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { urlFor } from 'lib/client'
import { useStateContext } from 'context/StateContext';
import Link from 'next/link'

const Cart = () => {
  const cartRef = useRef<HTMLInputElement>(null)
  const [closeIntent, setCloseIntent] = useState(false)
  const { cartItems, setShowCart, totalQuantities } = useStateContext();
  const handler = () => {
    console.log('Click cart')
  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' 
          onClick={() => setShowCart(false)} 
          onMouseLeave={() => setCloseIntent(false)}
          onMouseEnter={() => setCloseIntent(true)}>
          {closeIntent ? <TfiAngleDoubleRight /> : <TfiAngleDoubleLeft />}
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {
          cartItems.length < 1 && (
            <div className='empty-cart'>
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href={`/`}>
                <button type='button' className='btn' onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          )
        }
        <div className='product-container'>
        {
          cartItems.length > 0 && cartItems.map((item) => (
            <div className='product' key={item._id}>
              <img alt='' src={`${urlFor(item?.image[0])}`} className='cart-product-image' />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>{item.price}</h4>
                </div>

                <div className='flex bottom'>
                  <div>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={() => handler}><AiOutlineMinus /></span>
                    <span className='num'  > {1} </span>
                    <span className='plus' onClick={() => handler}><AiOutlinePlus /></span>
                  </p>
                  </div>

                  <button type='button' className='remove-item' onClick={() => handler}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))
        }

        </div>

      </div>
    </div>
  )
}

export default Cart