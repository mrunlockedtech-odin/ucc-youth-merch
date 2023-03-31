import React, { useState, useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0)
  const { decQty, incQty, qty, onAdd, setShowCart, changeColor, changeSize, size, color, changeFrontLogo, frontLogo } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty, size, color, frontLogo);

    setShowCart(true);
  }
  useEffect(() => {
    changeColor(product.Colors[0])
  }, [])
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <h4>Details: </h4>
          <p>{details}</p>
          <h4>Options: </h4>
          <div className="product-options">
            <div className="size-container">
              <label for="size">Size: </label>
              <select id="size" name="size" onChange={(e) => changeSize(e.target.value)}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="color-container">
              <label for="color">Color: </label>
              <select id="color" name="color" onChange={(e) => changeColor(e.target.value)}>
                {product.Colors.map((color) => {
                  return <option>{color}</option>
                })}
              </select>
            </div>
            {product.frontLogo ?
              <div className="front-logo-container">
                <label for="frLogo">Front Logo: </label>
                <select id="frLogo" name="frLogo" onChange={(e) => changeFrontLogo(e.target.value)}>
                  <option value="Square Logo">Square Logo</option>
                  <option value="Circular Logo">Circular Logo</option>
                </select>
              </div>
              :
              <></>
            }
          </div>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty, size, color, frontLogo)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              item.slug.current != product.slug.current ? <Product key={item._id} product={item} /> : <></>))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;
  const products = await client.fetch(query)
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product }
  }
}

export default ProductDetails