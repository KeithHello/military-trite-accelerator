// server.js
// where your node app starts

// init project
const express = require("express");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser());
app.use(morgan());

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("build"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/dist/index.html");
});

// use nodemailer to send email
app.post("/send", (request, response) => {
  const { username, address, wish } = request.body;
  const mailOptions = {
    from: "do_not_reply@northpole.com",
    to: "santa@northpole.com",
    subject: "Pending wish for " + username,
    text: `
      Child's name: ${username}
      Address: ${address}
      Wish:
      ${wish}
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      response
        .status(500)
        .send({
          success: false,
          message: "Something went wrong. Please try again later: " + err,
        });
    } else {
      console.log(`Email sent successfully: ${info.response}`);
      response.send({
        success: true,
        message: "Email sent successfully: " + info.response,
      });
    }
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
