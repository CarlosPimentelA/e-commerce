import React, { useContext, useEffect, useState } from 'react'
import './ProductFilter.css'
import { ProductContext } from '../context/ProductContext';

export const ProductFilter = () => {
  
  const { applyFilters } = useContext(ProductContext);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Aplicar filtros automáticamente al cambiar searchTerm
  useEffect(() => {
    const applySearchFilter = () => {
      applyFilters({ category, priceRange, searchTerm });
    };

    // Aplica los filtros solo si searchTerm no está vacío
    if (searchTerm.trim() !== '') {
      applySearchFilter();
    }
  }, [category, priceRange, searchTerm]);



  const handleApplyFilters = () => {
    applyFilters({ category, priceRange, searchTerm });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  }



  return (
    <div className="filter-container">
    <h3>Filtrar Productos</h3>
      <div className="filter-section">
        <label htmlFor="search-input">Buscar Productos:</label>
        <input  
          type="text"
          id="search-input"
          placeholder="Ingrese término de búsqueda"
          value={searchTerm}
          onChange={handleSearchTermChange} />
      </div>
    <div className="filter-content">
      <div className="filter-section">
        <label htmlFor="category-select">Categoría:</label>
        <select  
        id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas</option>
          <option value="celulares">Celulares</option>
          <option value="laptops">Laptops</option>
          <option value="tablets">Tablets</option>
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="price-range">Rango de Precio:</label>
        <select  
            id="price-range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Todos</option>
          <option value="0-100">$0 - $100</option>
          <option value="101-300">$101 - $300</option>
          <option value="301-500">$301 - $500</option>
          {/* Agrega más opciones de rangos de precios según sea necesario */}
        </select>
      </div>

      <button className="filter-button" onClick={handleApplyFilters}>Aplicar Filtros</button>
    </div>
  </div>
  )
}
