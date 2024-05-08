// user.js
const mongoose = require("mongoose");
const emailValidation = require("./validation/emailValidation");

const userSchema = new mongoose.Schema({
    email: {
        index: { unique: true },
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [emailValidation, "Please provide a valid email"],
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: false },
    calgEmail: {
        type: String,
        required: true,
        trim: true,
        validate: [emailValidation, "Please provide a valid email"],
    },
    calgPass: { type: String, required: true, trim: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
