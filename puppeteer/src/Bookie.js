import BookingPage from "./BookingPage";

export default function book(date, time, course, user) {
    return new Promise(async (resolve, reject) => {
        const bookingPage = new BookingPage("page1", "https://w.cps.golf/CityCalgaryGolfReservations/(S(ny0uvjcyurre3xvbt1gpuv0p))/Home/WidgetView");
        try {
            await bookingPage.open();
        } catch (e) {
            reject(e);
        }
        await bookingPage.signIn(user.email, user.password);
        const courses = await bookingPage.getCourses();
        console.log(courses);

        console.log(`Setting date ${date}`);

        const selectedCourse = courses.find(e => e.name === course);
        console.log(`Setting course ${JSON.stringify(selectedCourse)}`);

        // await waitTillTime({h: 18, m: 52});
        let teeTimes = [];
        try {
            teeTimes = await bookingPage.search({courseId: selectedCourse.id, date, maxPlayers: 4});
        } catch (e) {
            reject(e);
        }
        if (teeTimes.length === 0) {
            await bookingPage.close();
            console.error(`No tee times for ${time}`)
            reject(new Error(`No tee times for ${time}`));
            return;
        }
        const timeInMinutes = convertTimeToLong(time);

        const teeTime = teeTimes.filter(t => {
            const teeTimeInMinutes = convertTimeToLong(t.time);
            return teeTimeInMinutes - timeInMinutes > 0 && teeTimeInMinutes - timeInMinutes < 40;
        });

        if (teeTime.length === 0) {
            await bookingPage.close();
            console.error(`No tee times for ${time}`)
            resolve(null);
            return;
        }

        await bookingPage.book(teeTime[0]);

        await bookingPage.sleep(10000);

        console.log("closing");
        await bookingPage.close();
        console.log("closed");
        resolve(teeTime[0]);
    });
}

function convertTimeToLong(time) {
    const {hour, minutes, period} = getTime(time);
    let timeInMinutes = minutes;
    if (period === "PM" && hour !== 12) {
        timeInMinutes += 12 * 60;
    }
    timeInMinutes += hour * 60;
    return timeInMinutes;
}

function getTime(time) {
    const hour = Number.parseInt(time.split(":")[0]);
    const minutes = Number.parseInt(time.split(":")[1].split(" ")[0]);
    const period = time.split(":")[1].split(" ")[1];
    return {
        hour, minutes, period,
    };
}
