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
const Item = require('../Item/itemModel');
const Variant = require('../Variant/variantModel');

exports.addProduct = addOne(Product);
exports.getProducts = getAll(Product);
exports.getProduct = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id).populate({
        path: 'subCategory',
        select: 'name',
        populate: {
            path: 'category',
            select: 'name',
        },
    });

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    // Get items with their variants, grouped by brand
    const items = await Item.aggregate([
        {
            $match: {
                product: product._id,
            },
        },
        {
            // Lookup variants for each item
            $lookup: {
                from: 'variants',
                localField: '_id',
                foreignField: 'item',
                as: 'variants',
            },
        },
        {
            $group: {
                _id: '$brand',
                count: { $sum: 1 },
                items: {
                    $push: {
                        _id: '$_id',
                        name: '$name',
                        variants: {
                            $map: {
                                input: '$variants',
                                as: 'variant',
                                in: {
                                    _id: '$$variant._id',
                                    size: '$$variant.size',
                                    price: '$$variant.price',
                                    stock: '$$variant.stock',
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            $project: {
                brand: '$_id',
                items: 1,
                count: 1,
                _id: 0,
            },
        },
    ]);

    res.status(200).json({
        status: true,
        data: {
            ...product.toObject(),
            itemsByBrand: items,
        },
    });
});
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
