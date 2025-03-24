const express = require('express');
const {
    addCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('./categoryController');
const { protect, restrictTo } = require('../../utils/middlewares/auth');
const fileUploader = require('../../utils/middlewares/fileUploader');
const { resizeImage } = require('../../utils/middlewares/imageProcess');
const deleteImage = require('../../utils/middlewares/deleteImage');
const Category = require('./categoryModel');

const categoryRouter = express.Router();

// Middleware to attach model to request
const attachModel = (req, res, next) => {
    req.model = Category;
    next();
};

categoryRouter
    .route('/')
    .post(
        protect,
        restrictTo('admin'),
        fileUploader(['image'], 1024 * 1024 * 5),
        resizeImage,
        addCategory
    )
    .get(getCategories);

categoryRouter
    .route('/:id')
    .get(getCategory)
    .patch(
        protect,
        restrictTo('admin'),
        attachModel,
        deleteImage,
        fileUploader(['image'], 1024 * 1024 * 5),
        resizeImage,
        updateCategory
    )
    .delete(
        protect,
        restrictTo('admin'),
        attachModel,
        deleteImage,
        deleteCategory
    );

module.exports = categoryRouter;
