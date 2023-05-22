import * as schedule from "node-schedule";
import Booking from "../../schema/Booking";

import * as dotenv from "dotenv";
import connectDB from "../../config/db";
import User from "../../schema/User";
import {decrypt} from "../../modules/password/passwordUtils";
import book from "./Bookie";

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

async function main() {
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

    // let date = new Date(2023, 4, 22, 6, 0, 0);
    // bookTeeTime().then(res => console.log(res));
}

async function bookTeeTime(timeToBook = new Date(Date.now()),
                           time,
                           date,
                           course,
                           user,
) {
    console.log("Scheduling job for " + timeToBook.toISOString());
    schedule.scheduleJob(timeToBook, async function () {

        const booking = await book(date, time, course, user);
    });
}

main();
