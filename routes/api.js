const {MongoClient} = require("mongodb");
const express = require("express");
const router = express.Router();
const User = require("../schema/User");
const {hashPassword, encrypt, decrypt} = require("../modules/password/passwordUtils");
const Booking = require("../schema/Booking");

router.post("/users", (req, res) => {
    console.log("Request received");
    console.log(req.body);
    res.status(201)
       .json({"message": "User created"});
});
router.post("/register", async (req, res) => {
    if (req.body == null || Object.keys(req.body).length === 0) {
        res.status(400).send();
        return;
    }

    const {
        firstName, lastName, email, password, calgEmail, calgPass,
    } = req.body;

    //Check if exists
    const existingUser = await User.findOne({email});
    if (existingUser != null) {
        res.status(400).json({"success": false, message: "Player already exists"});
        return;
    }

    //Save player
    const user = new User({
        firstName, lastName, email, password: await hashPassword(password), calgEmail, calgPass: encrypt(calgPass),
    });
    const userSaved = await user.save();
    res.status(201).json({"success": true, "id": userSaved._id, "message": "Player added successfully"});
});

router.post("/bookings", async (req, res) => {
    if (req.body == null) {
        res.status(400).send();
        return;
    }

    const {user, course, date, time} = req.body;

    const booking = new Booking({
        user, course, date, time, status: "PENDING",
    });

    const bookingSaved = await booking.save();

    res.status(201).json(bookingSaved);

});

module.exports = router;
