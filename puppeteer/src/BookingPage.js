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

            const builder = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(options);

            if (process.env.SELENIUM_GRID_SERVER != null) {
                builder.usingServer(process.env.SELENIUM_GRID_SERVER);
            }

            this.driver = await builder.build();

            console.log(`${this.name} - Opening home page ${this.bookingUrl}`);
            try {
                await this.driver.get(this.bookingUrl);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    };

    getCourses = () => {
        return new Promise(async (resolve, reject) => {
            try {

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

            } catch (e) {
                reject(e);
            }
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
            try {
                const dateInput = await driver.findElement(By.id("FromDate"));
                resolve(await dateInput.getAttribute("value"));
            } catch (e) {
                reject();
            }
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
            try {
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
            } catch (e) {
                reject(e);
            }
        });

    };

    book = ({time, element}, isTest = false) => {
        return new Promise(async (resolve, reject) => {
            const driver = this.driver;
            const [_, modal] = await Promise.all([
                element.click(),
                driver.findElement(By.id("SelectPlayersAndHole")),
            ]);
            try {
                await driver.wait(until.elementIsVisible(modal));
                const modalButton = await modal.findElement(By.css("button.btn-primary"));
                await modalButton.click();
                await driver.wait(until.titleIs("Players Information"));
                const [agreeToTerms, reserveButton] = await Promise.all([
                    driver.findElement(By.css("span.cbx-icon")),
                    driver.findElement(By.id("btnBook")),
                ]);
                if (!isTest) {
                    await agreeToTerms.click();
                    await reserveButton.click();
                }

                resolve();
            } catch (e) {
                reject(e);
            }
        });
    };
}
