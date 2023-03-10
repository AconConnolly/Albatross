console.log('Node Started');
const {MongoClient} = require('mongodb')

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const port = 5500;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
    console.log("listening on port 5500");
});

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/html/SignIn.html');

});

app.post('/user', (req, res) => {
    console.log('Request received');
    console.log(req.body);
});


async function main() {
    const uri = 'mongodb://localhost:27017'
    console.log("Connecting to mongo")
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(err => {
        console.error("An error occurred connecting to mongo")
        client.close();
    });
    console.log("Connected")
    const mongoDbs = await client.db().admin().listDatabases();
    const databaseNames = mongoDbs.databases.map(db => db.name)
    console.log(`Databases::[${databaseNames.join(",")}]`)
}
main();

//HomePage script
//Display todays date in the Date space
var date = new Date();
var day = date.getDate();
var month = date.getMonth + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day;
document.getElementById("datePicker").value = today;
console.log(today);

//Try to pull variables
function runUserSelection() {
    
    const courseSelection = document.getElementById("courses").value;
    console.log(courseSelection);

    const dateSelection = document.getElementById("datepicker").value;
    console.log(dateSelection);

    const holeSelection = document.getElementById("holes").value;
    console.log(holeSelection);

}

const selectionForm = document.getElementById("form");
selectionForm.addEventListener("submit", function(event) {
    event.preventDefault();
    runUserSelection();
})



