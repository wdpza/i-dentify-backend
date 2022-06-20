import mongoose from 'mongoose';

// Product Schema for Wordpress API Products
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
  },
  excerpt: {
    type: mongoose.Schema.Types.Mixed,
  },
  tags: [String],
});

const Product = mongoose.model('Product', productSchema);

export default Product;