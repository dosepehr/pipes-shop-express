const express = require('express');
const {
    addSubCategory,
    getSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
} = require('./subCategoryController');
const SubCategory = require('./subCategoryModel');
const { restrictTo, protect } = require('../../utils/middlewares/auth');
const { resizeImage } = require('../../utils/middlewares/imageProcess');
const deleteImage = require('../../utils/middlewares/deleteImage');
const subCategoryRouter = express.Router();
const fileUploader = require('../../utils/middlewares/fileUploader');

const attachModel = (req, res, next) => {
    req.model = SubCategory;
    next();
};

subCategoryRouter
    .route('/')
    .post(
        protect,
        restrictTo('admin'),
        fileUploader(['image'], 1024 * 1024 * 5),
        resizeImage,
        addSubCategory
    )
    .get(getSubCategories);

subCategoryRouter
    .route('/:id')
    .get(getSubCategory)
    .patch(
        protect,
        restrictTo('admin'),
        attachModel,
        deleteImage,
        fileUploader(['image'], 1024 * 1024 * 5),
        resizeImage,
        updateSubCategory
    )
    .delete(
        protect,
        restrictTo('admin'),
        attachModel,
        deleteImage,
        deleteSubCategory
    );

module.exports = subCategoryRouter;
