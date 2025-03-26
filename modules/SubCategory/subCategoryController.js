const expressAsyncHandler = require('express-async-handler');
const {
    addOne,
    getOne,
    getAll,
    updateOne,
    deleteOne,
} = require('../Factory/factoryController');
const SubCategory = require('./subCategoryModel');
const Category = require('../Category/categoryModel');
const AppError = require('../../utils/Classes/AppError');

exports.addSubCategory = addOne(SubCategory);
exports.getSubCategory = getOne(SubCategory, [
    {
        path: 'category',
        select: 'name',
    },
    {
        path: 'products',
        select: 'name',
    },
]);
exports.getSubCategories = getAll(SubCategory);
exports.updateSubCategory = updateOne(SubCategory);
exports.deleteSubCategory = deleteOne(SubCategory);

exports.checkCategoryExists = expressAsyncHandler(async (req, res, next) => {
    // Skip if no category is being updated
    if (!req.body.category) {
        return next();
    }

    // Check if category exists
    const category = await Category.findById(req.body.category);

    if (!category) {
        return next(
            new AppError(
                'Category not found. Please provide a valid category ID',
                404
            )
        );
    }

    // Category exists, proceed to next middleware
    next();
});
