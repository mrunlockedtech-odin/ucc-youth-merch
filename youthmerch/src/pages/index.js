import React from 'react'

const home = () => {
  return (
    <>
      HeroBanner
      <div>
        <h2>Best Selling Products</h2>
        <p>Speakers of Many Variations</p>
      </div>
      <div>
        {['Product 1', 'Product 2'].map((product) => product)}
      </div>

      Footer
    </>
  )
}

export default home