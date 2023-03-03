console.log('Node Started');
const MongoClient = require('mongodb').MongoClient

const express = require('express');

const app = express();

const bodyParser= require('body-parser');

const port = 5500;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

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



const uri ='mongodb://localhost:27017'

// MongoClient.connect(url, (error, client) => {
//     if(error) console.error(error);
//     console.log('Connected to MongoDb');
// });

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("albatrossDatabase").collection("User/Password");
  // perform actions on the collection object
  console.log("test")
  client.close();
});