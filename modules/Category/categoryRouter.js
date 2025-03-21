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


const categoryRouter = express.Router();

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
        resizeImage,
        fileUploader(['image'], 1024 * 1024 * 5),
        updateCategory
    )
    .delete(protect, restrictTo('admin'), deleteCategory);

module.exports = categoryRouter;
