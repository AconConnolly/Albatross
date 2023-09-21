import book from "../Bookie";
import {COURSES} from "../index";

async function test() {
    const date = Date.now()
    const time = "12:00 PM"
    const course = COURSES.MCCALL_LAKE_18
    //Fill me in!!
    const user = {}
    await book(date, time, course, user, true)
}

test()
