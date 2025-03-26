const Product = require('./productModel');
const {
    addOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require('../../modules/Factory/factoryController');
const SubCategory = require('../SubCategory/subCategoryModel');
const AppError = require('../../utils/Classes/AppError');
const expressAsyncHandler = require('express-async-handler');

exports.addProduct = addOne(Product);
exports.getProducts = getAll(Product);
exports.getProduct = getOne(Product, [
    {
        path: 'subCategory',
        select: 'name',
        populate: {
            path: 'category',
            select: 'name',
        },
    },
]);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);

exports.checkSubCategoryExists = expressAsyncHandler(async (req, res, next) => {
    // Skip if no subCategory is being updated
    if (!req.body.subCategory) {
        return next();
    }

    // Check if subCategory exists
    const subCategory = await SubCategory.findById(req.body.subCategory);

    if (!subCategory) {
        return next(
            new AppError(
                'SubCategory not found. Please provide a valid subCategory ID',
                404
            )
        );
    }
    next();
});
