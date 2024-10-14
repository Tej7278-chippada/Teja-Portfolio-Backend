const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend-backend communication

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Node.js backend!' });
});

// Contact Form Email API route
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
  
    // Create a transporter using your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail', // For example, using Gmail service
      auth: {
        user: 'tejachippada15@gmail.com', // Your email
        pass: 'wcux hxui dkhj erej', // Your email password or App-specific password
      },
    });
  
    // Email content
    const mailOptions = {
      from: email, // Sender's email
      to: 'tejachippada15@gmail.com', // Predefined recipient email
      subject: `Message from ${name}`, // Subject line
      text: `You have a new message from: ${name} (${email})\n\n${message}`, // Message body
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
