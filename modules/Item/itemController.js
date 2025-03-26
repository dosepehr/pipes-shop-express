const expressAsyncHandler = require('express-async-handler');
const Product = require('../Product/productModel');
const Item = require('./itemModel');
const AppError = require('../../utils/Classes/AppError');
const { addOne, updateOne, deleteOne } = require('../Factory/factoryController');

exports.createItem = addOne(Item);
exports.updateItem = updateOne(Item);
exports.deleteItem = deleteOne(Item);

exports.checkProductExists = expressAsyncHandler(async (req, res, next) => {

    // Skip if no product is being updated
    if (!req.body.product) {
        return next();
    }

    // Check if product exists
    const product = await Product.findById(req.body.product);

    if (!product) {
        return next(
            new AppError(
                'Product not found. Please provide a valid product ID',
                404
            )
        );
    }
    next();
});
