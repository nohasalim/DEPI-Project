const generateToken = require("../../../utils/generateToken");
const httpStatusText = require("../../../utils/httpStatusText");

module.exports = (req, res) => {
    const token = generateToken(req.user);

    return res.redirect(
        `http://localhost:5173/auth/callback?token=${token}`
    );
};