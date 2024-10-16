const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend-backend communication

// app.get('/api', (req, res) => {
//     res.json({ message: 'Hello from Node.js backend!' });
// });

// Contact Form Email API route
app.post('/send-email', (req, res) => {
    const { fname, sname, email, message } = req.body;
  
    // Create a transporter using your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail', // For example, using Gmail service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or App-specific password
      },
    });
  
    // Email content
    const mailOptions = {
      from: email, // Sender's email
      to: process.env.EMAIL_USER, // Predefined recipient email
      subject: `Message from ${fname} ${sname}`, // Subject line
      text: `You have a new message from: ${fname} ${sname} (${email})\n\n${message}`, // Message body
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    });
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
