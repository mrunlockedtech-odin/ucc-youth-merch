import React, { createContext, useContext, useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';
import product from '../youthmerch/schemas/product';

const Context = createContext();


export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('S');
  const [color, setColor] = useState('');
  const [frontLogo, setFrontLogo] = useState("Square Logo");
  
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []
  });
  const [totalPrice, setTotalPrice] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem('totalPrice') !== null ? JSON.parse(localStorage.getItem('totalPrice')) : 0
  });
  const [totalQuantities, setTotalQuantities] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem('totalQuantities') !== null ? JSON.parse(localStorage.getItem('totalQuantities')) : 0
  });


  let foundProduct;
  let index;

  useEffect(() => {
    if (typeof window !== "undefined") {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
        localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities))
    }
  }, [cartItems, totalPrice, totalQuantities]);

  const onAdd = (product, quantity, size, color, frontLogo) => {
    product.description = size + " " + color + ", " + frontLogo
    const checkProductInCart = cartItems.find((item) => item.description === product.description);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {

      const updatedCartItems = cartItems.map((cartProduct) => {

        if (cartProduct.description === product.description) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
        } else {
          return { ...cartProduct }
        }

      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.description === product.description)
    const newCartItems = cartItems.filter((item) => item.description !== product.description)

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems)
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if (value === "inc") {
      setCartItems([...cartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity + 1 }, ...cartItems.slice(index + 1)]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([...cartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity - 1 }, ...cartItems.slice(index + 1)]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  }

  const changeColor = (sentColor) => {
    setColor(sentColor)
    console.log(sentColor)
  }
  const changeSize = (sentSize) => {
    setSize(sentSize)
    console.log(sentSize)
  }
  const changeFrontLogo = (frLogo) => {
    setFrontLogo(frLogo)
    console.log(frLogo)
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        changeColor,
        changeSize,
        size,
        color,
        frontLogo,
        changeFrontLogo
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);