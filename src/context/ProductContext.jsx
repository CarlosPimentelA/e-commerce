// import React, { useEffect, useState, createContext, useContext } from 'react'

// export const ProductContext = createContext();

// export const ProductProvider = ({children}) => {
//      const [products, setProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products?page=${currentPage}`);

//         if (!response.ok) {
//           throw new Error('Ocurrió un error al obtener los productos');
//         }

//         const data = await response.json();
//         setProducts(data.docs);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProducts();
//   }, [currentPage]);


//   const nextPage = () => {
//     setCurrentPage(currentPage + 1);
//   }

//   const prevPage = () => {
//     if(currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }

//   return (
//     <ProductContext.Provider value={{
//         products,
//         currentPage,
//         nextPage,
//         prevPage
//     }}>
//       {children}
//     </ProductContext.Provider>
//   );
// }

import React, { useEffect, useState, createContext } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    searchTerm: '',
  });


  const fetchProducts = async () => {
    try {
      let url = `http://localhost:3000/api/products?page=${currentPage}`;

      // Agregar parámetros de filtro a la URL
      if (filters.category) url += `&category=${filters.category}`;
      if (filters.priceRange) url += `&priceRange=${filters.priceRange}`;
      if (filters.searchTerm) url += `&search=${filters.searchTerm}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Ocurrió un error al obtener los productos');
      }

      const data = await response.json();
      setProducts(data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts({});
  }, [currentPage, filters]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      searchTerm: '',
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        currentPage,
        nextPage,
        prevPage,
        applyFilters,
        resetFilters,
        filters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
