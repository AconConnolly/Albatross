import * as schedule from "node-schedule";
import Booking from "../../schema/Booking";

import * as dotenv from "dotenv";
import connectDB from "../../config/db";
import User from "../../schema/User";
import {decrypt} from "../../modules/password/passwordUtils";
import book from "./Bookie";
import retry from "async-retry";

const result = dotenv.config({path: "../config/.env"});

if (result.error) {
    throw result.error;
}

console.log(result.parsed);

const GOLF_SITE = "https://www.calgary.ca/csps/recreation/golf-courses.html";

const COURSES = {
    "CONFEDERATION_PARK": "Confederation Park (9)",
    "MAPLE_RIDGE_18": "Maple Ridge (18)",
    "MAPLE_RIDGE_9": "Maple Ridge (Back 9)",
    "LAKEVIEW_9": "Lakeview (9)",
    "MCCALL_LAKE_18": "McCall Lake (18)",
    "MCCALL_LAKE_9": "McCall Lake (Back 9)",
    "MCCALL_LAKE_3": "McCall Lake (Par 3)",
    "SHAGANAPPI_9": "Shaganappi (Back 9)",
    "SHAGANAPPI_VALLEY_9": "Shaganappi (Valley 9)",
    "SHAGANAPPI_18": "Shaganappi Point (18)",
};

const TIMEOUT = 60000;
const MAX_RETRY = 50;

async function main() {
    await run();
}

async function run() {
    await connectDB();
    let jobs = await Booking.find();
    for (let job of jobs) {
        const {user, course, date, time, status} = job;
        if (status !== "PENDING") {
            continue;
        }

        const userObj = await User.findOne({"email": user});
        if (userObj == null) {
            console.log(`Can't schedule job ${job} no user found`);
            continue;
        }
        const email = userObj.calgEmail;
        const password = decrypt(userObj.calgPass);
        console.log(email, password);

        const dateDate = new Date(date);
        const timeToBook = new Date(dateDate.getUTCFullYear(), dateDate.getUTCMonth(), dateDate.getUTCDate() - 5, 6, 0, 0);
        console.log(`Booking ${course} for ${email} on ${date} ${time} at ${timeToBook}`);
        bookTeeTime(timeToBook, time, date, course, {email, password}).then();
    }
}

async function bookTeeTime(timeToBook = new Date(Date.now()),
                           time,
                           date,
                           course,
                           user,
) {
    console.log("Scheduling job for " + timeToBook.toISOString());
    schedule.scheduleJob(timeToBook, async function () {
        await retry(async () => {
                console.log(`Attempting to book ${course} for ${email} on ${date} ${time}`);
                const booking = await book(date, time, course, user);
                console.log("Booked ", booking);
            },
            {
                retries: MAX_RETRY,
                minTimeout: 1000,
                maxTimeout: TIMEOUT,
            });
    });
}

async function bookTeeTimeWork(time, date, course, user) {
    let booked = false;
    do {
        try {
            booked = true;
        } catch (e) {
            console.log(e);
        }
    } while (!booked);
}

main();
