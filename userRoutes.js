// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('./user'); // Assuming user model is defined in user.js

// Handle user registration
router.post('/register', async (req, res) => {
    try {
        // Extract user data from request body
        const { email, firstName, lastName, password, calgEmail, calgPass } = req.body;

        // Create new user document
        const newUser = new User({ email, firstName, lastName, password, calgEmail, calgPass });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
