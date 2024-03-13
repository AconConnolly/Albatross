const mongoose = require("mongoose");
const {Schema} = mongoose;

const bookingStatus = ["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"];

const BookingSchema = new Schema({
    user: {
        type: String,
        required: true,
        trim: true,
        ref: "User",
    },
    course: {type: String, required: true, trim: true},
    date: {type: String, required: true, trim: true},
    time: {type: String, required: true, trim: true},
    status: {type: String, required: true, trim: false, enum: bookingStatus},
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
