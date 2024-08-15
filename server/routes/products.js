const express = require('express')
const router = express.Router()
const {createProduct,getAllProducts,deleteProduct,updateProduct} = require('../controllers/products')
const upload = require('../middleware/upload')


router.route('/').post(upload.array('images',10) ,createProduct).get(getAllProducts)
router.route('/:id').delete(deleteProduct).patch(updateProduct)

module.exports = router