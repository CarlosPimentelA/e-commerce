import express from "express";
import CartProduct from "../models/cartProducts.js";
import auth from "../middleware/auth.js";
const routerCart = express.Router();

routerCart.post("/cart", auth, async (req, res) => {
  const cart = new CartProduct({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

routerCart.get("/cart/one", auth, async (req, res) => {
  try {
    const cart = await CartProduct.find({owner: req.user._id})
    if (!cart) {
      res.status(404).send('There is nothing here!')
    }
    res.send(cart)
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

routerCart.delete("/cart/:id", auth, async (req, res) => {
  try {
    const cart = await CartProduct.findOne({ _id: req.params.id, owner: req.user._id });
    
    if(!cart) {
        res.status(404).send()
    }
    res.send(cart)
} catch (error) {
    res.status(500).send()
  }
});

export default routerCart;
