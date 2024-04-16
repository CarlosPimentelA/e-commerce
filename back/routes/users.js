import express from "express";
import User from "../models/users.js";
const routerUser = express.Router();
import auth from '../middleware/auth.js'

// Create user

routerUser.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

routerUser.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.userExist(email, password);
    const token = await user.generateJwt();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({error: error.message});
  }
});

routerUser.post('/logout', auth, async (req, res) => {
  try {
    if (req.user) {
      req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
      await req.user.save();

      res.send();
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

routerUser.delete('/delete/:id', auth, async(req, res) => {
  try {
   const user = User.findById(req.params.id)
   if(!user) {
    res.status(404).send({error: 'Usuario no encontrado'})
   }
  await user.deleteOne()
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})


export default routerUser;
