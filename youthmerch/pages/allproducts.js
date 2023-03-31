import React, {useState} from 'react';
import { client } from '../lib/client';
import { Product } from '../components';

const allProducts = ({ products}) => {
  const[selectedProducts,setSelectedProducts] = useState(products)
  const productTypes = Array.from (new Set(products.map((product) => product.type)))

  const handleTypeSelection = (e) => {
    setSelectedProducts(products.filter(product => product.type === e.target.value || e.target.value === 'All Items'))
  }
  return (
    <>
      <div className="products-heading">
        <h2>All Products</h2>
      </div>

      <div className="all-products-selection">
        <label for="product-type"> Filter By</label>
        <select name="product-type" id="product-type" className="product-selection" onChange={handleTypeSelection}>
          <option value="All Items">All Items</option>
          {productTypes?.map((productType) => <option value={productType}>{productType}</option>)}
        </select>
      </div>

      <div className="products-container gridProducts">
        {selectedProducts?.map((product) => <Product key={product._id} product={product}/>)}
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
export default allProducts