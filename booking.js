const booking = {
    name: "John Doe",
    date: "2023 04 15",
    time: "12:00pm",
    guests: 4, 
    //Need to code for guest functionality
    course: "Lakeview"
};

const bookingInfo = document.getElementById("booking-info");

bookingInfo.innerHTML = `
<p><strong>Name:</strong>${booking.name}</p>
<p><strong>Date:</strong>${booking.date}</p>
<p><strong>Time:</strong>${booking.time}</p>
<p><strong>Guests:</strong>${booking.guests}</p>
<p><strong>Course:</strong>${booking.course}</p>
`;