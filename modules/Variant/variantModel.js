const mongoose = require('mongoose');
const variantSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        default: 0,
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
});

const Variant = mongoose.model('Variant', variantSchema);

module.exports = Variant;
