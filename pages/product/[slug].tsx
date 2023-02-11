import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { client, urlFor } from 'lib/client'
import { Product } from 'components';
import { useStateContext } from 'context/StateContext';

type PropType = {
  product: IProduct;
  products: IProduct[];
}

const ProductDetails = ({ product, products }: PropType) => {
  const { image, name, details, price } = product
  const [imageIndex, setImageIndex] = useState(0)
  const { quantity, incQuantity, decQuantity, onAdd } = useStateContext()
 
  const handleBuyNow = () => {
    console.log('handleBuyNow')
  }

  return (
    <div>
      <div className='product-detail-container'>
        <div>

          <div className='image-container'>
            {image.length > 0 && <img alt='' src={`${urlFor(image[imageIndex])}`} className='product-detail-image' />}
          </div>

          <div className='small-images-container'>
            {image.length > 0 && image.map((item, i) => (
              <img alt='' key={`${i}`}
                src={`${urlFor(item)}`}
                className={i === imageIndex ? 'small-image selected-image' : 'small-image' }
                onMouseEnter={() => setImageIndex (i)}
              />
            ))}
          </div>

        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p> (20) </p>
          </div>

          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>

          <div className='quantity'>
            <h3>Quantity: </h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQuantity}><AiOutlineMinus /></span>
              <span className='num'  > {quantity} </span>
              <span className='plus' onClick={incQuantity}><AiOutlinePlus /></span>
            </p>
          </div>

          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, quantity)}>Add to Cart</button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
          </div>
          
        </div>

      </div>

      <div  className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
              <div className='maylike-products-container track'>
                {
                  products.map((item) => <Product key={item._id} product={item} />)
                }
              </div>
            </div>
      </div>
    </div>
  )
}

export default ProductDetails

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{ slug { current }}`
  const products = await client.fetch(query)
  const paths = products.map((product: IProduct) => ({
    params: { slug: product.slug.current }
  }))
  return { paths, fallback: 'blocking' }
}



type PropType2 = { params: { slug: Slug } }

export const getStaticProps = async ({ params: { slug } }: PropType2) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`
  const productsQuery = `*[_type == "product"]`
  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return { props: { product, products } }
}

