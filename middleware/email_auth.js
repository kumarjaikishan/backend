const nodemailer = require('nodemailer');
const user = require('../modals/login_schema');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kumar.jaikishan0@gmail.com',
        pass: process.env.gmail_password
    }
});

const emailmiddleware = async (req, res) => {
    console.log(req.body.userid);
    try {
        const query = await user.findOne({ email: req.body.email });
        // console.log(query);
        if (query.isverified) {
            console.log(query.isverified);
            // next();
        } else {
            // Define the email options
            const mailOptions = {
                from: 'kumar.jaikishan0@gmail.com',
                to: query.email,
                subject: 'Email Verification-Expense Management system',
                html: `Hi ${query.name}, please <a href="https://backend-exp-man.vercel.app/verify?id=${query._id}" target="_blank">Click Here</a>  to Verify your Email,   Thanks for Joining Us, from Jai kishan(Developer)`
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                   res.status(201).json({
                    msg:"Email sent, check your inbox",
                   })
                    console.log('Email sent:', info.response);
                }
            });
        }
    } catch (error) {

    }
}
module.exports = emailmiddleware;
