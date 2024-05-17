import React, { useContext, useEffect, useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { ProductFilter } from "../components/ProductFilter";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Footer";
import "./Products.css";
import { ProductContext } from "../context/ProductContext";
import { FiltersContext } from "../context/FiltersContext";
export const Products = () => {
  const { products, nextPage, prevPage } = useContext(ProductContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const { applyFilters, resetFilters, filterProducts } =
    useContext(FiltersContext);

  const handleNextPage = () => {
    nextPage();
  };

  const handlePreviousPage = () => {
    prevPage();
  };

  useEffect(() => {
    applyFilters();
    setFilterProduct(filterProducts);
  }, []);

  return (
    <>
      <NavBar />
      <div className="container-products">
        <section className="sec-filters">
          <ProductFilter />
        </section>
        <section className="sec-products">
          {filterProducts.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </section>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage}>Anterior</button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
      <Footer />
    </>
  );
};
