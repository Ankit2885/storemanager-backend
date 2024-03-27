const Product = require("../models/productModel");
const path = require('path');

exports.getAllProducts = async (req, res) => {
    try {
        const data = await Product.find()
        if (!data) {
            return res.status(400).json({
                status: false,
                data: data,
                message: 'No products found'
            })
        }
        res.status(200).json({
            status: true,
            data: data,
            message: 'Fetched products successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const { _id } = req.body
        const data = await Product.findById(_id)
        if (!data) {
            return res.status(400).json({
                status: false,
                data: data,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            status: true,
            data: data,
            message: 'Product found successfully'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { filename } = req.file
        const { name, category, price } = req.body
        const productImage = "http://localhost:4000/images/" + filename

        const newProduct = new Product({ name, category, price, productImage })
        const data = await newProduct.save();
        if (!data) {
            return res.status(400).json({
                status: false,
                data: data,
                message: 'Product not created'
            })
        }
        res.status(200).json({
            status: true,
            data: data,
            message: 'Created Product successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    };
}

exports.updateProduct = async (req, res) => {
    try {
        const { _id, name, category, price } = req.body
        let productImage = ""
        if (req.file) {
            const filename = req.file.filename
            productImage = "http://localhost:4000/images/" + filename
        } else {
            const product = await Product.findById(_id)
            productImage = product.productImage
        }
        const updatedProduct = await Product.findOneAndUpdate(
            { _id },
            { name, category, price, productImage },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                status: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            status: true,
            data: updatedProduct,
            message: 'Product updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { _id } = req.body
        const data = await Product.findByIdAndDelete({ _id })
        if (!data) {
            return res.status(404).json({
                status: false,
                data: data,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            status: true,
            data: data,
            message: 'Product deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}
