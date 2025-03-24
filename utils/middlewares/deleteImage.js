const fs = require('fs').promises;
const path = require('path');

const deleteImage = async (req, res, next) => {
    try {
        // Skip if no ID provided
        if (!req.params.id) {
            return next();
        }

        // Get the category from database
        const category = await req.model.findById(req.params.id);

        if (!category) {
            return next();
        }

        if (category.image) {
            const imagePath = path.join(
                __dirname,
                '../../public/uploads',
                category.image
            );

            try {
                await fs.access(imagePath);
                await fs.unlink(imagePath);
                console.log(`Image deleted: ${imagePath}`);
            } catch (error) {
                console.log(`Image ${imagePath} not found or already deleted`);
            }
        }

        // Store the found document in req for later use
        req.document = category;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = deleteImage;
