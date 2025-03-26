const Variant = require('./variantModel');
const {
    addOne,
    updateOne,
    deleteOne,
} = require('../../modules/Factory/factoryController');
const Item = require('../Item/itemModel');
const expressAsyncHandler = require('express-async-handler');
const AppError = require('../../utils/Classes/AppError');

exports.addVariant = addOne(Variant);
exports.updateVariant = updateOne(Variant);
exports.deleteVariant = deleteOne(Variant);

exports.checkItemExists = expressAsyncHandler(async (req, res, next) => {
    if (!req.body.item) {
        return next();
    }
    const item = await Item.findById(req.body.item);
    if (!item) {
        return next(new AppError('Item not found', 404));
    }
    next();
});
