const Product = require("../models/Product");
const Category = require("../models/Category");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      oldPrice,
      description,
      category,
      material,
      color,
      size,
      dimensions,
    } = req.body;

    const categoryValue = await Category.findById(category);
    if (!categoryValue) {
      return res.status(400).json({ message: "Category not found" });
    }

    let images = [];
    if (req.files) {
      images = req.files.map((file) => file.path);
    }

    const product = await Product.create({
      name,
      price,
      oldPrice,
      description,
      category: categoryValue._id,
      images,
      material,
      color,
      size,
      dimensions,
    });

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { categories, minPrice, maxPrice } = req.query;
    const queryObject = {};

    if (categories) {
      queryObject.category = { $in: categories.split(",") };
    }

    if (minPrice) {
      queryObject.price = { $gte: minPrice };
    }

    if (maxPrice) {
      queryObject.price = { $lte: maxPrice };
    }
    console.log(queryObject);
    const products = await Product.find(queryObject);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
