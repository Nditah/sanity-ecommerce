import React from 'react'
import Link from 'next/link'
import { urlFor } from 'lib/sanity-client'

type PropType = {
  footerData: IBanner
}
const FooterBanner = ({ footerData }: PropType) => {
  const { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product } = footerData
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>

        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{footerData.buttonText}</button>
          </Link>
        </div>

        <img className='footer-banner-image'
          src={`${urlFor(footerData.image)}`}
          alt={footerData.product}
        />

      </div>
    </div>
  )
}

export default FooterBanner