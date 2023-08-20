const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = 'SE.ekdijoikdd' //this will get from sendGrid site after login

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pdebasish540@gmail.com',
        subject: 'Welcome to my channel',
        text: `Welcome ${name}, to our application. Thank you.`,
        html: ''
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pdebasish540@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}, I hope to see you again`,
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}