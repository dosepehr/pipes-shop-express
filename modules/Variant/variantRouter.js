const { Router } = require('express');
const {
    addVariant,
    updateVariant,
    deleteVariant,
    checkItemExists,
} = require('./variantController');
const { protect, restrictTo } = require('../../utils/middlewares/auth');
const variantRouter = Router();

variantRouter
    .route('/')
    .post(protect, restrictTo('admin'), checkItemExists, addVariant);
variantRouter
    .route('/:id')
    .patch(protect, restrictTo('admin'), checkItemExists, updateVariant)
    .delete(protect, restrictTo('admin'), deleteVariant);
module.exports = variantRouter;
