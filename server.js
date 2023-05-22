// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser());
app.use(morgan());

const transporter = nodemailer.createTransport({
	host: import.meta.env.VITE_HOST,
  port: parseInt(import.meta.env.VITE_PORT),
	auth: {
    user: import.meta.env.VITE_USER,
    pass: import.meta.env.VITE_PASS,
  },
});

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/dist/index.html');
});

// use nodemailer to send email
app.post('/send', (request, response) => {
  const { name, email, message } = request.body;
  
  

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
