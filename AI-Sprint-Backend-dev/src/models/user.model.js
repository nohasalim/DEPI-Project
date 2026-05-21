const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: String,
        provider: {
            type: String,
            default: "local",
        },
        providerId: String,
        avatar: String,


    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);