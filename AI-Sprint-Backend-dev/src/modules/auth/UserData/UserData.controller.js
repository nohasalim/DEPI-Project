const User = require("../../../models/user.model");
const httpStatusText = require("../../../utils/httpStatusText");

const UserData = async (req, res) => {
    const email = req.user.email;
    // console.log('user  => ',req.user)
    try {
        const user = await User.findOne({ email }).select("-password");
        if (!user) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "this user is not found!"
            });
        }
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: user
        });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error.message,
            data: {}
        });
    }
};

module.exports = { UserData }