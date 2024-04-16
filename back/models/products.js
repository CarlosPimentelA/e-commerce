import mongoose from "mongoose";
import mongoosePagination from 'mongoose-paginate-v2'
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

productSchema.plugin(mongoosePagination)

const Product = mongoose.model("Product", productSchema);

export default Product;
