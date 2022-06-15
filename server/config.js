const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: process.env.REACT_APP_EMAIL_USERNAME,
        pass: process.env.REACT_APP_EMAIL_PASSWORD
    }
});

module.exports = transporter;