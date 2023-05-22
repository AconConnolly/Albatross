import {Builder, By, Key, until} from "selenium-webdriver";
import {Options} from "selenium-webdriver/chrome";

const GOLF_SITE = "https://www.calgary.ca/csps/recreation/golf-courses.html";

const RESERVATION_SITE_TITLE = "City Calgary Golf Reservations";

const TEE_TIME = "Book a tee time online";

const EMAIL_ID = "Email";
const PASSWORD_ID = "Password";

export default class BookingPage {
    constructor(name, bookingUrl, windowSize = {width: 1000, height: 1000}) {
        this.name = name;
        this.driver = null;
        this.bookingUrl = bookingUrl;
        this.signInUrl = bookingUrl.replace("/Home/WidgetView", "/Account/nLogOn");
        this.windowSize = windowSize;
    }

    open = () => {
        return new Promise(async (resolve, reject) => {
            const options = new Options();
            if (this.windowSize != null) {
                options.windowSize(this.windowSize);
            }

            this.driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(options)
                .build();
            console.log(`${this.name} - Opening home page ${this.bookingUrl}`);
            await this.driver.get(this.bookingUrl);
            resolve();
        });
    };

    getCourses = () => {
        return new Promise(async (resolve, reject) => {
            const courseDd = await this.driver.findElement(By.id("ddlCourse"));
            const selections = await courseDd.findElements(By.css("option"));
            const courses = [];
            for (const selection of selections) {
                const [id, name] = await Promise.all([
                    selection.getAttribute("value"),
                    selection.getText(),
                ]);
                courses.push({id, name});
            }
            resolve(courses);
        });
    };

    close = () => {
        return new Promise(async (resolve, reject) => {
            console.log(`${this.name} - Closing driver ${this.name}`);
            await this.driver.quit();
            resolve();
        });
    };

    sleep = (time = 1000) => {
        return new Promise(async (resolve, reject) => {
            await this.driver.sleep(time);
            resolve();
        });
    };

    signIn = async (email, password) => {
        return new Promise(async (resolve, reject) => {
            const driver = this.driver;
            await driver.get(this.signInUrl);
            const [emailElement, passwordElement] = await Promise.all([
                driver.findElement(By.id(EMAIL_ID)),
                driver.findElement(By.id(PASSWORD_ID)),
            ]);

            await emailElement.sendKeys(email);

            await passwordElement.sendKeys(password, Key.ENTER);

            await driver.wait(until.titleIs(RESERVATION_SITE_TITLE));
            resolve();
        });

    };

    setDate = (date) => {
        return new Promise(async (resolve, reject) => {
            const driver = this.driver;
            await driver.executeScript(`document.getElementById("FromDate").value = "${date}"`);
            const dateInput = await driver.findElement(By.id("FromDate"));
            resolve(await dateInput.getAttribute("value"));
        });

    };

    setCourse = (id) => {
        return new Promise(async (resolve, reject) => {
            const driver = this.driver;
            await driver.executeScript(`document.getElementById("ddlCourse").value = "${id}"`);
            const dateInput = await driver.findElement(By.id("ddlCourse"));

            resolve(await dateInput.getAttribute("value"));
        });
    };

    search = ({courseId, date, maxPlayers = 4}) => {
        return new Promise(async (resolve, reject) => {
            const driver = this.driver;
            await driver.executeScript(`
                document.getElementById("ddlCourse").value = "${courseId}";
                document.getElementById("FromDate").value = "${date}";
                document.getElementById("playerNumberGroup");
                [].slice.call(document.getElementById("playerNumberGroup").children).find(function(b) { return b.textContent === "${maxPlayers}"}).click();
                [].slice.call(document.getElementById("holeNumberGroup").children).find(function(b) { return b.textContent === "18 Holes"}).click();
                
            `);
            const submit = await driver.findElement(By.id("btnSubmit"));
            await submit.sendKeys(Key.ENTER);
            await driver.wait(until.elementLocated(By.id("bodyContent")), 5000);

            const teeTimeElements = await driver.findElements(By.css("div.teetime"));
            const teeTimes = [];

            for (const tee of teeTimeElements) {
                const time = await tee.getAttribute("teetime");
                if (time != null) {
                    teeTimes.push({
                        time,
                        element: tee,
                    });
                }
            }

            resolve(teeTimes);
        });

    };

    book = ({time, element}) => {
        return new Promise(async (resolve, reject) => {
            const driver = this.driver;
            const [_, modal] = await Promise.all([
                element.click(),
                driver.findElement(By.id("SelectPlayersAndHole")),
            ]);
            // console.log(modalButton);
            await driver.wait(until.elementIsVisible(modal));
            const modalButton = await modal.findElement(By.css("button.btn-primary"));
            await modalButton.click();
            await driver.wait(until.titleIs("Players Information"));
            const [agreeToTerms, reserveButton] = await Promise.all([
                driver.findElement(By.css("span.cbx-icon")),
                driver.findElement(By.id("btnBook")),
            ]);
            // await agreeToTerms.click();
            // await reserveButton.click();

            resolve();
        });
    };
}

/*
let driver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.get(GOLF_SITE);
      const bookingUrl = await getBookingUrl(driver);
      console.log(bookingUrl);
    } catch (e) {
      console.log("error" + e);
      reject();
    } finally {
      console.log("Closing driver");
      driver
        .quit()
        .then((a) => console.log("Driver closed"))
        .catch((e) => console.log("Errororor"));
      console.log("Closed driver");
      resolve();
    }


async function getBookingUrl(driver) {
  const atags = await driver.findElement(By.linkText(TEE_TIME));
  return await atags.getAttribute("href");
}
*/
