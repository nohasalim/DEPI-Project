const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
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