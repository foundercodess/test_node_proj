const mongoose = require("mongoose");
const Counter = require("./counter");

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true }, 
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }], 
  price: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

productSchema.pre("save", async function (next) {
  if (!this.productId) {
    const counter = await Counter.findOneAndUpdate(
      { name: "productId" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.productId = counter.value;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
