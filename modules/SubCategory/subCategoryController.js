const {
    addOne,
    getOne,
    getAll,
    updateOne,
    deleteOne,
} = require('../Factory/factoryController');
const SubCategory = require('./subCategoryModel');

exports.addSubCategory = addOne(SubCategory);
exports.getSubCategory = getOne(SubCategory);
exports.getSubCategories = getAll(SubCategory);
exports.updateSubCategory = updateOne(SubCategory);
exports.deleteSubCategory = deleteOne(SubCategory);
