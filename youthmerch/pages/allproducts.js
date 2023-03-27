import React from 'react';
import { client } from '../lib/client';
import { Product } from '../components';

const Home = ({ products}) => {
  return (
    <>
      <div className="products-heading">
        <h2>All Products</h2>
      </div>
      <div className="products-container gridProducts">
        {products?.map((product) => <Product key={product._id} product={product}/>)}
        {console.log(products)}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query)

  return {
    props: { products }
  }
}
export default Home