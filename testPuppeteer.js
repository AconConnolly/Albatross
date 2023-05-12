const puppeteer = require('puppeteer');

async function makereservations(email, password, date, time, courseNo, players, holes) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://w.cps.golf/CityCalgaryGolfReservations/(S(fdd2l0rv4teklwspzhebi1dn))/Account/nLogOn#Hash',
    {waitUntil: 'networkidle2'});
    await page.type('input[type="email"]', email);
    await page.type('input[type="password"]', password);
   
   
        await page.click('a[loginselected="0"]');
        await page.waitForNavigation({waitUntil: "networkidle2"});
  

    const currentDate = new Date();
    const bookingDate = new Date(date);

    const timeDiff = bookingDate.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff > 5) {
        console.log("Outside of the time frames");
        await browser.close();
        const waitTime = daysDiff - 5;
        const waitMillSec = waitTime * 24 * 60 * 60 * 1000;
        await new Promise (resolve => setTimeout(resolve,waitMillSec));
        console.log("Within window, booking now");
    }
    // const dateDropDown = await page.$('#FromDate');
    // const tdElement = await page.type('input[type="today.active.day"]', date);

    const timeDrop = await page.$('#StartTimeDropDown');
    await timeDrop.select(time);

    const courseDrop = await page.$('#ddlCourse');
    await courseDrop.select(courseNo);

    const playerSelector = `button[data-value="${players}"]`;
    const buttonElement = await page.$(playerSelector);
    await buttonElement.click();

    const holeSelector = `button[data-value="${holes}"]`;
    const holeElement = await page.$(holeSelector);
    await holeElement.click();

    const searchButtonElement = await page.$('#btnSubmit');
    await searchButtonElement.click();
    await page.waitForNavigation({waitUntil: "networkidle2"});

 

    // const availableTeetimes = await page.$$('.tee-time-slot .status:has-text("Available")');
    // if (availableTeetimes.length > 0) {
    //         const teeTimesSlot = availableTeetimes[0].$('.time-slot');
    //         await Promise.all([
    //         teeTimesSlot.click(),
    //         page.waitForSelector('.modal-content')
    //     ]);

    //     await page.click('.modal-content button.btn-primary');
    //     await page.waitForSelector('.alert-success');
    //     console.log('Tee time booked oh yeah');
    // } else {
    //     console.log('No luck buddday');
    // }
    //     await browser.close();
    }

makereservations('alexc8932@gmail.com', 'Welcome644373', '2023-05-12', 'AnyTime', '4', '3', 'Search18')