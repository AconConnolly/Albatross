const dotenv = require("dotenv");
const express = require("express");
//routes
const apiRoutes = require("./routes/api");
const connectDB = require("../config/db")


dotenv.config({path: "./config/.env"});
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5500;
connectDB().then();

app.use(express.static("server"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/SignIn.html");
});
app.get("/account-bookings", (req, res) => {
    res.sendFile(__dirname + "/public/html/accountBookings.html");
});
app.get("/account-info", (req, res) => {
    res.sendFile(__dirname + "/public/html/accountInfo.html");
});
app.get("/confirmation", (req, res) => {
    res.sendFile(__dirname + "/public/html/confirmation.html");
});
app.get("/courses", (req, res) => {
    res.sendFile(__dirname + "/public/html/courses.html");
});
app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/public/html/HomePage.html");
});
app.get("/registration", (req, res) => {
    res.sendFile(__dirname + "/public/html/registration.html");
});

const server = app.listen(port, function () {
    console.log(`listening on port ${port}`);
});


process.on("unhandeldRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})
