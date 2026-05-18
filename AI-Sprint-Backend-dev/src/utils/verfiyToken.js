const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(404).json({ status: httpStatusText.ERROR, message: "Authentication token is required.", data: null });
    }
    const token = authHeader.split(" ")[1];


    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(404).json({ status: httpStatusText.ERROR, message: error.message, data: null });
    }


}