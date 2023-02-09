import React from 'react'
import Link from 'next/link'
import { urlFor } from 'lib/client'

type PropType = {
  product: IProduct
}

const Product = ({ product }: PropType) => {
  const { image, name, price, slug,  } = product
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
         {image.length > 0 && <img src={`${urlFor(image[0])}`} className='product-image'  alt={name} width={250} height={250} />}
         <p className='product-name'>{name}</p>
         <p className='product-price'>{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
