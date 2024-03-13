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

app.get('/accountInfo', function(req, res) {
    const userId = req.session.userId; // assuming you're using sessions to store user ID
    User.findById(userId, function(err, user) {
      if (err) throw err;
      res.render('accountInfo', {user: user}); // assuming you're using a view engine such as EJS
    });
  });

app.get('/accountInfo', function(req, res) {
// Retrieve user information from the database
const userId = req.session.userId;
const query = `SELECT * FROM users WHERE id = ${userId}`;

db.query(query, function(error, result) {
    if (error) {
    console.error(error);
    res.status(500).send('Error retrieving user information');
    return;
    }

    // Render the accountInfo page with the user's information
    const user = result[0];
    res.render('accountInfo', { 
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password
    });
});
});
  
  