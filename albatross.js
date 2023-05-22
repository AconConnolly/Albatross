//I've split this into a client and server side js.

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

    res.sendFile(__dirname + '/public/html/Signin.html');

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
