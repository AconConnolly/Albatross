console.log('Node Started');
const {MongoClient} = require('mongodb')

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const port = 5500;

app.use(express.static('/public'));

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
    console.log(`Databases::[${databaseNames.join(",")}]`)
}
main();

//HomePage script
//Display todays date in the Date space
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day;
document.getElementById("datePicker").value = today;
console.log(today);

//Try to pull variables
function runUserSelection() {
    
    const courseSelection = document.getElementById("courses").value;
    console.log(courseSelection);

    const dateSelection = document.getElementById("datepicker").value;
    console.log(dateSelection);

    const holeSelection = document.getElementById("holes").value;
    console.log(holeSelection);

}

const selectionForm = document.getElementById("form");
selectionForm.addEventListener("submit", function(event) {
    event.preventDefault();
    runUserSelection();
})

//Log in and Authentication
const loginPage = document.getElementById("login-page");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginPage.email.value;
    const password = loginPage.password.value;
    
    const emailregex = /\S+@\S+\.\S+/;
    if (!email || !emailregex.test(email) || !password) {
        alert('Please enter a valid email and password');
        return;
    }

    if(email === 'alexc8932@gmail.com' && password === '123') {
        alert("Successful log in");
        localStorage.setItem('isLoggedIn', true);
        window.location.href='/public/HomePage.html';
    } else {
        alert ("Incorrect login! Idiot.");
    }
})

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


//Use puppeteer to make reservations. This assumes that we pass our city of calgary email
//and password to the page/type function. 
const puppeteer = require('puppeteer');

async function makereservations(email, password, date) {
    const browser = await puppeteer.launch();
    const page = await puppeteer.newPage();

    await page.goto('https://www.calgary.ca/csps/parks/recreation/golf-courses/calgary-golf-courses.html');
    await page.type('#login-email', email);
    await page.type('#login-password', password);
   
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





