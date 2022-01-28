const nodemailer = require('nodemailer')

const sendOTP = async(data) => {
    console.log('this is otp' + data.otp)
    console.log(data)
    const otp = data.otp
    const name = data.name
    const email = data.email
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'collegecharchaa@gmail.com',
            pass: 'College@123'
        }
    });
    let info = await transporter.sendMail({
        from : 'collegecharchaa@gmail.com',
        to: email,
        subject: "OTP from College Charcha", // Subject line
        text: `Hello ${name} this your OTP for registration`, // plain text body
        html: `<b>${otp}</b>`, // html body
    })
    console.log("Message sent: %s", info.messageId);
}

module.exports = sendOTP