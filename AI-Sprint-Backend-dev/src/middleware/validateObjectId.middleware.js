const mongoose = require("mongoose");
const httpStatusText = require("../utils/httpStatusText");

const validateObjectId = (paramName) => {
    return (req, res, next) => {
        const id = req.params[paramName];

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "Invalid ID format",
            });
        }

        next();
    };
};

module.exports = validateObjectId;