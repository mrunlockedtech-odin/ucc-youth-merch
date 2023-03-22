import Link from 'next/link'
import React from 'react'

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="hoodies">Small Text</p>
        <h3>MidText</h3>
        <img src="" alt="hoodies" className="hero-banner-image" />

        <div>
          <Link href="/product/ID">
            <button type="button">Button Text</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner