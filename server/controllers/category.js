const Category = require('../models/Category')

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).json({ category })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(201).json({categories })
    }catch (error) {
        res.status(500).json({ message: error })
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json({ category })
    }catch (error) {
        res.status(500).json({ message: error })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        }
        res.status(200).json({ category })
    }catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = { createCategory,getCategories,updateCategory,deleteCategory }