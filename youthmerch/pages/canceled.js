import React from 'react';
import Link from 'next/link';
import { BsFillBagDashFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext';


const Success = () => {
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsFillBagDashFill />
        </p>
        <h2>Your Order was not complete</h2>
        <p className="email-msg">You may have cancelled or the order did not go through properly</p>
        <p className="description">
          If you have any questions, please email 
          <a className="email" href="mailto:info@uccgarland.org">
            info@uccgarland.org
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success