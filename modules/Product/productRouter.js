const express = require('express');
const {
    addProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('./productController');
const { protect, restrictTo } = require('../../utils/middlewares/auth');
const fileUploader = require('../../utils/middlewares/fileUploader');
const { resizeImage } = require('../../utils/middlewares/imageProcess');
const deleteImage = require('../../utils/middlewares/deleteImage');
const Product = require('./productModel');

const productRouter = express.Router();

const attachModel = (req, res, next) => {
    req.model = Product;
    next();
};

productRouter
    .route('/')
    .post(
        protect,
        restrictTo('admin'),
        fileUploader(['image'], 1024 * 1024 * 5),
        resizeImage,
        addProduct
    )
    .get(getProducts);

productRouter
    .route('/:id')
    .get(getProduct)
    .patch(
        protect,
        restrictTo('admin'),
        attachModel,
        deleteImage,
        fileUploader(['image'], 1024 * 1024 * 5),
        resizeImage,
        updateProduct
    )
    .delete(
        protect,
        restrictTo('admin'),
        attachModel,
        deleteImage,
        fileUploader(['image'], 1024 * 1024 * 5),
        resizeImage,
        deleteProduct
    );

module.exports = productRouter;
