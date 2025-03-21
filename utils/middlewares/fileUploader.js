const multer = require('multer');
const path = require('path');

const uploader = (fields, maxFileSize) => {
    const storage = multer.memoryStorage(); // Use memory storage for optional processing

    const fileFilter = (req, file, cb) => {
        // If fields is just an array of strings, convert it to proper format
        const fieldConfigs = fields.map((field) => {
            return typeof field === 'string'
                ? {
                      name: field,
                      validExtensions: ['.jpg', '.jpeg', '.png', '.gif'], // default extensions
                  }
                : field;
        });

        const field = fieldConfigs.find((f) => f.name === file.fieldname);
        if (!field) {
            return cb(new Error(`Unexpected field: ${file.fieldname}`), false);
        }

        const ext = path.extname(file.originalname).toLowerCase();
        if (field.validExtensions.includes(ext)) {
            cb(null, true); // Accept the file
        } else {
            cb(
                new Error(
                    `Invalid file type for ${
                        file.fieldname
                    }. Allowed types: ${field.validExtensions.join(', ')}`
                ),
                false
            );
        }
    };

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxFileSize,
        },
    }).single(fields[0]); // Add .single() for single file upload
};

module.exports = uploader;
