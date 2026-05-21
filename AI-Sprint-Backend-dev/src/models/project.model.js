// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },

//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     status: {
//         type: String,
//         enum: ["active", "completed", "archived"],
//         default: "active"
//     },
//     team: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         }
//     ]

// }, {
//     timestamps: true
// });

// module.exports = mongoose.model("Project", projectSchema);
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ["active", "completed", "archived"],
        default: "active"
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    icon: {
        type: String,
        default: "📊"
    },
    iconBgColor: {
        type: String,
        default: "bg-purple-100"
    },
    team: {
        type: Number,
        default: 0
    },
    taskCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);