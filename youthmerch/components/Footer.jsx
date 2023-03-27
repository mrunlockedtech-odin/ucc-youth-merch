import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 UCC Youth  All Rights Reserved</p>
      <p className="icons">
        <Link href="https://www.instagram.com/ucc.yth/">
          <AiFillInstagram />
        </Link>
      </p>
    </div>
  )
}

export default Footer