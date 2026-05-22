const User = require("../../../models/user.model");
const generateToken = require("../../../utils/generateToken");
const httpStatusText = require("../../../utils/httpStatusText");
const { compare } = require("../../../utils/hashPassword");

const SignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "this email is not found!"
            });
        }
        if (!user.password) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "This account uses social login"
            });
        }
        const matchedPassword = await compare(password, user.password);

        if (!matchedPassword) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "invalid password"
            });
        }

        const token = generateToken(user);

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            token: token,
            user: userData
        });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error.message,
            user: {}
        });
    }
};

module.exports = { SignIn }