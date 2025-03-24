const mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

subCategorySchema.virtual('products', {
    ref: 'Product',
    foreignField: 'subCategory',
    localField: '_id',
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
