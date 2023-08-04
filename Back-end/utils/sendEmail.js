const nodeMailer = require('nodemailer');


const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'tiktoktiktokqaz@gmail.com', // generated ethereal user
            pass: 'fxalvakkjrgyyzxb' // generated ethereal password
        }
    })

    const mailOptions = {
        from: 'tiktoktiktokqaz@gmail.com', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    }

    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail;