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
    return new Promise(async resolve => {
        let scheduledJobs = {};
        await connectDB();
        let jobs = await Booking.find({"status": "PENDING"});
        if (jobs.length === 0) {
            console.log("no jobs to schedule")
            resolve();
            return;
        }

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

            const dateDate = new Date(date);
            const timeToBook = new Date(dateDate.getUTCFullYear(), dateDate.getUTCMonth(), dateDate.getUTCDate() - 4, 6, 0, 0);
            console.log(`Booking ${course} for ${email} on ${date} ${time} at ${timeToBook}`);
            scheduledJobs[job._id] = job;
            await Booking.findOneAndUpdate({"_id": job._id}, {"status": "IN_PROGRESS"})
            scheduleTeeTimeBooking(job._id, timeToBook, time, date, course, {email, password})
                .then(async (id) => {
                    //Update status to COMPLETED
                    await Booking.findOneAndUpdate({"_id": id}, {"status": "COMPLETED"});
                    delete scheduledJobs[id];
                    if (Object.keys(scheduledJobs).length === 0) {
                        resolve();
                    }

                }).catch(async (id) => {
                //Update status to FAILED
                await Booking.findOneAndUpdate({"_id": id}, {"status": "FAILED"});
                delete scheduledJobs[id];
                if (Object.keys(scheduledJobs).length === 0) {
                    resolve();
                }
            });
        }
    });

}

function scheduleJob(job) {

}

function scheduleTeeTimeBooking(id,
                                timeToBook = new Date(Date.now()),
                                time,
                                date,
                                course,
                                user,
) {
    return new Promise(async (resolve, reject) => {
        if (timeToBook.getTime() < Date.now()) {
            console.log(`Booking immediately ${id}`);
            const booked = await bookTeeTime(id, time, date, course, user);
            if (booked) {
                resolve(id);
            } else {
                reject(id);
            }
        } else {
            console.log("Scheduling job for " + timeToBook.toISOString());
            schedule.scheduleJob(timeToBook, async function () {
                const booked = await bookTeeTime(id, time, date, course, user);
                if (booked) {
                    resolve(id);
                } else {
                    reject(id);
                }
            });
        }
    });

}

async function bookTeeTime(id,
                           time,
                           date,
                           course,
                           user) {
    let booked = false;
    await retry(async bail => {
            console.log(`Attempting to book ${course} on ${date} ${time}`);
            try {
                const booking = await book(date, time, course, user);
                if (booking == null) {
                    console.error("Could not book tee time");
                } else {
                    console.log("Booked ", booking);
                    booked = true;
                }
            } catch (e) {
                console.log("I'm an error ", e);
                throw e;
            }
        },
        {retries: MAX_RETRY, minTimeout: 1000, maxTimeout: TIMEOUT});
    return booked;

}

main().then(() => process.exit(0));
