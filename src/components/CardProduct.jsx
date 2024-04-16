import React from 'react'
import "./CardProduct.css"
import { BiCartAdd } from "react-icons/bi";


export const CardProduct = ({product}) => {
  return (
  <div className="card-product">
    <div className="img-product">
      <img src={product.image} alt={product.name}/>
    </div>
    <div className="product-info">
        <div className="name-product">
          <h2>{product.name}</h2>
        </div>
        {/* <div className="rate">
          <p>Rate</p>
        </div> */}
        <div className="price-product-cart">
          <h3>RD$ {product.price}</h3>
          <BiCartAdd className='react-cart-icon'/>
        </div>
      </div>
  </div>
  )
}
