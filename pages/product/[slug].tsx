import React from 'react'
import { client, urlFor } from 'lib/client'

type PropType = {
  product: IProduct;
  products: IProduct[];
}

const ProductDetails = ({ product, products }: PropType) => {
  const { image, name, details, price } = product
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            {image.length > 0 && <img alt='' src={`${urlFor(image[0])}`} />}
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

