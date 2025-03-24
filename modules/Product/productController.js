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
exports.getProduct = getOne(Product);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
