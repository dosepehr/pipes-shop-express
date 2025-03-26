const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../../utils/middlewares/auth');
const {
    createItem,
    updateItem,
    deleteItem,
    checkProductExists,
} = require('./itemController');

router
    .route('/')
    .post(protect, restrictTo('admin'), checkProductExists, createItem)
router
    .route('/:id')
    .patch(protect, restrictTo('admin'), checkProductExists, updateItem)
    .delete(protect, restrictTo('admin'), deleteItem);

module.exports = router;
