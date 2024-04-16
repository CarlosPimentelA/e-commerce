import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CartProduct from "./cartProducts.js";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email incorrecto!");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Minimo 8 caracteres"],
    validate(value) {
      if (value.includes("123456")) {
        throw new Error("Password inseguro");
      }
    },
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartProduct",
    },
  ],
});

userSchema.statics.userExist = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Error de login");
  }

  return user;
};

userSchema.methods.generateJwt = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "a");
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.pre("deleteOne", async function (next) {
  try {
    const userId = this.getQuery()["_id"];
    await CartProduct.deleteMany({ owner: userId });
    next();
  } catch (error) {
    res.status(500).send({error: error.message})
  }
});

userSchema.pre('save', async function (next) {
  try {
  if(this.isModified('password') || this.isNew) {
    const hashPassword = await bcrypt.hash(this.password, 8)
    this.password = hashPassword
  }
  next()
  } catch (error) {
    console.log(error)
  }
})

const User = mongoose.model("User", userSchema);

export default User;
