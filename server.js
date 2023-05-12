const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5500;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, function () {
    console.log("listening on port 5500");
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/SignIn.html');
});
app.post('/user', (req, res) => {
    console.log('Request received');
    console.log(req.body);
});
app.post('/register', async (req, res) => {
    console.log('Request received');
    console.log(req.body);
  
    const uri = 'mongodb://localhost:27017'
    console.log("Connecting to mongo")
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  
    console.log("Connected")
    const db = client.db('albatrossDatabase');
    const collection = db.collection('User');
    const result = await collection.insertOne({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      calgEmail: req.body.calgEmail,
      calgPass: req.body.calgPass
    });
    console.log(result.ops[0]);
    res.send('Player added successfully');
    client.close();
  });

async function main() {
    const uri = 'mongodb://localhost:27017'
    console.log("Connecting to mongo")
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(err => {
        console.error("An error occurred connecting to mongo")
        client.close();
    });

    console.log("Connected")
    const mongoDbs = await client.db().admin().listDatabases();
    const databaseNames = mongoDbs.databases.map(db => db.name)
    const db = client.db('albatrossDatabase');
    const collection = db.collection('User');
    console.log(`Databases::[${databaseNames.join(",")}]`)
}
main();

//Use puppeteer to make reservations. This assumes that we pass our city of calgary email
//and password to the page/type function. 
const puppeteer = require('puppeteer');

async function makereservations(email, password, date) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://www.calgary.ca/csps/parks/recreation/golf-courses/calgary-golf-courses.html',
    {waitUntil: 'networkidle2'});
    await page.type('input[type="email"]', email);
    await page.type('input[type="password"]', password);
   
    await Promise.all([
        await page.waitForNavigation(),
        await page.click('#login-button')
    ]);

    const currentDate = new Date();
    const bookingDate = new Date(date);

    const timeDiff = bookingDate.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff > 5) {
        console.log("Outside of the time frames");
        const waitTime = daysDiff - 5;
        const waitMillSec = waitTime * 24 * 60 * 60 * 1000;
        await new Promise (resolve => setTimeout(resolve,waitMillSec));
        console.log("Within window, booking now");
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
        console.log('Tee time booked oh yeah');
    } else {
        console.log('No luck buddday');
    }
        await browser.close();
    }

    if (require.main == module) {
        const [,, email, password, day, time] = process.argv;
        makereservations(email, password, day, time);
    }

module.exports = makereservations;

//Using axios and cheerio to pull info from the city of calgary page
//Rough attempt - probably has errors
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://w.cps.golf/CityCalgaryGolfReservations/(S(da5jiz0rgjllwu5y1thj0ijv))/Home/WidgetView';

axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        const teeTimes = $('.tee-time-slot');

        const teeTimeData = teeTimes.map((index, element) => {
            const time = $(element).find('.time-slot').text().trim();
            const available = $(element).find('.status').text().trim() === 'Available';
            return {time, available};
        }).get();
        console.log(teeTimeData);
    })
    .catch(error => {
        console.error(error);
    });