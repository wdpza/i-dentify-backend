import Product from "../models/Product.js";
import axios from "axios";

export const importProducts = async (req, res) => {
  try {
    
    // First get the products from the wordpress API
    const products = await axios.get(
      process.env.WP_API_URL + "/product?per_page=100&page=1"
    );

    // Then create a Product model for each product
    const productModels = products.data.map(product => {
      product.title = product.title.rendered;
      product.content = product.content.rendered;
      product.excerpt = product.excerpt.rendered;
      
      return new Product(product);
    });

    // Then save the products to the database
    await Product.insertMany(productModels);

    // Then get the products from the database
    const productsFromDb = await Product.find();

    res.status(200).json({
      success: true,
      data: productsFromDb
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const createProduct = async (req, res) => {
  try {
    // Create instance of Product model
    const product = new Product(req.body);

    // Save the product to the database
    await product.save();

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
