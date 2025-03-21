const {
    addOne,
    getOne,
    getAll,
    updateOne,
    deleteOne,
} = require('../Factory/factoryController');
const Category = require('./categoryModel');

exports.addCategory = addOne(Category);
exports.getCategory = getOne(Category);
exports.getCategories = getAll(Category);
exports.updateCategory = updateOne(Category);
exports.deleteCategory = deleteOne(Category);
