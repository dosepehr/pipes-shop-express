const Product = require('./productModel');
const {
    addOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require('../../modules/Factory/factoryController');
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
