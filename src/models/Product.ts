import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    badge: { type: String },
    description: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;