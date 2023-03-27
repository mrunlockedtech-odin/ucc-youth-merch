import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <p className="logo">
          <Link href="/">UCC Youth</Link>
        </p>
      </div>
      <div className="navbar-navCart">
        <p className="logo allProductHeader">
          <Link href="/allproducts">All Products</Link>
        </p>

        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        {showCart && <Cart />}
      </div>

    </div>
  )
}

export default NavBar