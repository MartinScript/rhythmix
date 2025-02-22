const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Martins Ojo <${process.env.EMAIL_FROM}>`;
    }
    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            //SendGrid
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    };
    async send(template, subject) {
        //Render HTML template
        const html = pug.renderFile(`${__dirname}/../../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        //Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };
        //Create transport and send mail
        await this.newTransport().sendMail(mailOptions);
    };

    async sendWelcome() {
        await send('welcome', 'Welcome to the Natours family');
    };

    async sendPasswordReset() {
        await send('passwordReset', 'Your password reset token (valid for only 10 mins)');
    };
};