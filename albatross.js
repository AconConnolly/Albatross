const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const User = require('./schema/User'); // Assuming user model is defined in user.js
const userRoutes = require('./userRoutes'); // Assuming user routes are defined in userRoutes.js

const app = express();
const port = 5500;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/albatross", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        // Start the server after connecting to MongoDB
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Serve the sign-in page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/SignIn.html');
});

// User registration route
app.use('/user', userRoutes);

// Perform axios and cheerio operations
const url = 'https://w.cps.golf/CityCalgaryGolfReservations/(S(da5jiz0rgjllwu5y1thj0ijv))/Home/WidgetView';
app.get('/tee-time-data', async (req, res) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const teeTimes = $('.tee-time-slot');
        const teeTimeData = teeTimes.map((index, element) => {
            const time = $(element).find('.time-slot').text().trim();
            const available = $(element).find('.status').text().trim() === 'Available';
            return { time, available };
        }).get();
        res.json(teeTimeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Make reservations using puppeteer
app.post('/make-reservations', async (req, res) => {
    const { email, password, date } = req.body;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.calgary.ca/csps/parks/recreation/golf-courses/calgary-golf-courses.html');
        await page.type('#login-email', email);
        await page.type('#login-password', password);
        await Promise.all([
            page.waitForNavigation(),
            page.click('#login-button')
        ]);
        const currentDate = new Date();
        const bookingDate = new Date(date);
        const timeDiff = bookingDate.getTime() - currentDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        if (daysDiff > 5) {
            const waitTime = daysDiff - 5;
            const waitMillSec = waitTime * 24 * 60 * 60 * 1000;
            await new Promise(resolve => setTimeout(resolve, waitMillSec));
        }
        const availableTeetimes = await page.$$('.tee-time-slot .status:has-text("Available")');
        if (availableTeetimes.length > 0) {
            const teeTimesSlot = availableTeetimes[0].$('.time-slot');
            await Promise.all([
                teeTimesSlot.click(),
                page.waitForSelector('.modal-content')
            ]);
            await page.click('.modal-content button.btn-primary');
            await page.waitForSelector('.alert-success');
            res.json({ message: 'Tee time booked successfully' });
        } else {
            res.status(404).json({ message: 'No available tee times' });
        }
        await browser.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;
