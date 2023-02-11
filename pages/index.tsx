import type { NextPage } from 'next'
import { client } from 'lib/sanity-client'
import {
  Cart,
  Footer,
  FooterBanner,
  HeroBanner,
  Layout,
  Navbar,
  Product,
} from '../components'


type PropType = {
  products: IProduct[];
  bannerData: IBanner[];
}

const Home = ({ products, bannerData }: PropType) => {
  console.log({ products, bannerData });
  return (
    <div>
      {bannerData.length > 0 && <HeroBanner heroBanner={bannerData[0]} />}

      <div className='products-heading'>
        <h2>Best Seeling Product</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {
          products.map((product: IProduct) => <Product key={product._id} product={product} />)
        }
      </div>

      {bannerData.length > 0 && <FooterBanner footerData={bannerData[0]} />}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)
  const queryBanner = '*[_type == "banner"]'
  const bannerData = await client.fetch(queryBanner)

  return { props: { products, bannerData } }
}

