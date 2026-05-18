const User = require("../../../models/user.model");
const { hash } = require("../../../utils/hashPassword");
const generateToken = require("../../../utils/generateToken");

const service = async (data) => {
    if (!data.username || !data.email || !data.password) {
        throw new Error("All fields required");
    }

    const exists = await User.findOne({ email: data.email });
    if (exists) throw new Error("User exists");

    const user = await User.create({
        username: data.username,
        email: data.email,
        password: await hash(data.password),
    });

    const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
};

module.exports = async (req, res) => {
    try {
        const result = await service(req.body);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};