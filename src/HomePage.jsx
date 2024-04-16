import React, { useContext, useEffect, useState } from 'react'
import { CategoryFilterCard } from './components/CategoryFilterCard'
import { categories } from './helpers/categories'
import { CardProduct } from './components/CardProduct'
import { SlideShow } from './components/SlideShow'

import "./HomePage.css"
import { ProductContext } from './context/ProductContext'
import NavBar from "./components/NavBar";
import { Footer } from "./components/Footer";
export const HomePage = () => {

  const {products, nextPage, currentPage, prevPage} = useContext(ProductContext);

  const handleNextPage = () => {
    nextPage();
  }

  return (
    <>
    <NavBar/>
      <SlideShow/>
      <CategoryFilterCard category = {categories} />
      
   
      <div className="product-container">
      <h2 className='title-products'>Para ti</h2>
        <div className="products">
        {products.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))} 
        </div>
      </div>
      <div className="pagination">
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
      <Footer/>
    </>
  )
}
