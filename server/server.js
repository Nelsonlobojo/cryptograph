
//import the necessary modules
const crypto = require('crypto');
const transporter = require('./config');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const app = express();

// environment decoding using dot env
dotenv.config();

// building the path
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));


// function for encrypting uisng DES algorithm using crypto
function encrypt3DES(data, key) {
  const md5Key = crypto.createHash('md5').update(key).digest("hex").substr(0, 24);
  const cipher = crypto.createCipheriv('des-ede3', md5Key, '');

  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

// security key that will be shared with the client via otp and encryption

const securityKey = crypto.randomBytes(32);

// email sending function

app.post('/send', (req, res) => {

  // encrypt the file
  const message = req.body.message;
  const encryptedMessage = encrypt3DES(message, securityKey);

  // prepare the mail options to be sent via nodemailer
  try {
    const mailOptions = {
      from: process.env.REACT_APP_EMAIL_USERNAME,
      to: req.body.email,
      subject: 'Your encrypted message',
      html: `<p>Your encrypted message:</p>
             <p>${encryptedMessage}</p>`,
    };

    // function for sending the email
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Something went wrong. Try again later'
        });
      } else {
        res.send({
          success: true,
          message: 'Email sent successfully'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong. Try again later'
    });
  }
});


app.listen(3030, () => {
  console.log('server start on port 3030');
});


