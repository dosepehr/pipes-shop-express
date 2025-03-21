const expressAsyncHandler = require('express-async-handler');
const AppError = require('../../utils/Classes/AppError');
const APIFeatures = require('../../utils/Classes/APIFeatures');

exports.deleteOne = (Model) => {
    return expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const doc = await Model.findByIdAndDelete(id);
        if (!doc) {
            return next(new AppError('no document found with this ID', 404));
        }
        res.status(204).json({
            status: true,
        });
    });
};

exports.addOne = (Model, validation) => {
    return expressAsyncHandler(async (req, res, next) => {
        if (validation) {
            await validation.validate(req.body);
        }
        await Model.create(req.body);
        res.status(201).json({
            status: true,
            message: 'created',
        });
    });
};

exports.updateOne = (Model, validation) => {
    return expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params;
        if (validation) {
            await validation.validate(req.body);
        }
        await Model.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true,
        });
        res.status(200).json({
            status: true,
            message: 'updated',
        });
    });
};

exports.getAll = (Model, populateOptions = []) => {
    return expressAsyncHandler(async (req, res, next) => {
        // Build the base query using the APIFeatures class
        let features = new APIFeatures(Model.find({}), req.query)
            .filter()
            .sort()
            .limit()
            .paginate();

        // Apply population to the final query
        let query = features.query;
        if (populateOptions.length) {
            populateOptions.forEach((pop) => {
                query = query.populate(pop);
            });
        }

        // Execute the populated query
        const data = await query;

        res.status(200).json({
            status: true,
            length: data?.length || 0,
            data,
        });
    });
};

exports.getOne = (Model, populateOptions = []) => {
    return expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params;

        // Build the query
        let query = Model.findOne({ _id: id });

        // Apply population if provided
        if (populateOptions.length) {
            populateOptions.forEach((pop) => {
                query = query.populate(pop);
            });
        }

        const data = await query;

        if (!data) {
            return res.status(404).json({
                status: false,
                message: 'Resource not found',
            });
        }

        res.status(200).json({
            status: true,
            data,
        });
    });
};
