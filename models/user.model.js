const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        lowercase: true,
        trim: true
    },
    profile_picture: {
        type: String,
        default: null,

    },
    current_Balance: {
        type: Number,
        default: 0,
        trim: true
    }

}, { timestamps: true })

const user = mongoose.model("user", userSchema)

module.exports = user