const express = require('express');
const router = express.Router();
const { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const { singleFileUpload } = require('../middleware/singleFileUpload');

router.post('/fetch-all-products', getAllProducts)
router.post('/fetch-product', getProduct)
router.post('/create-product', singleFileUpload, createProduct)
router.post('/update-product', singleFileUpload, updateProduct)
router.post('/delete-product', deleteProduct)

module.exports = router