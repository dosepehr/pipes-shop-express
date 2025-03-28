const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
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
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);



categorySchema.virtual('subcategories', {
    ref: 'SubCategory',
    foreignField: 'category',
    localField: '_id',
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
