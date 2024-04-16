import express from "express";
import Product from "../models/products.js";

const routerProducts = express.Router();

// Create

routerProducts.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all products
routerProducts.get('/products', async (req, res) => {
  const options = {
    limit: parseInt(req.query.limit, 10) || 20,
    page: parseInt(req.query.page, 10) || 1,
  };

  // Construir el filtro de consulta
  const filter = {};

  // Agregar filtro por categoría si se proporciona
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Agregar filtro por rango de precio si se proporciona
  if (req.query.priceRange) {
    const [minPrice, maxPrice] = req.query.priceRange.split('-');
    filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  }

  // Agregar filtro por término de búsqueda si se proporciona
  if (req.query.search) {
    // Utiliza expresiones regulares para hacer coincidir el término de búsqueda en el título o descripción
    const searchTerm = new RegExp(req.query.search, 'i');
    filter.$or = [{ name: searchTerm }];
  }

  try {
    const products = await Product.paginate(filter, options);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one product

routerProducts.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update product

routerProducts.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete product

routerProducts.delete("/products/:id", async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
});

// Filter product by category

routerProducts.get("/products/category/:category", async (req, res) => {
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    page: parseInt(req.query.page, 10) || 1
  }

  try {
    const products = await Product.paginate({ category: req.params.category }, options);
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Filter product by name

routerProducts.get("/products/name/:name", async (req, res) => {
  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    page: parseInt(req.query.page, 10) || 1
  }

  try {
    const products = await Product.paginate({ name: req.params.name }, options);
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default routerProducts;
