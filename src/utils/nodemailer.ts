import nodemailer from "nodemailer";

import { message } from 'antd';

const transporter = nodemailer.createTransport({
	host: import.meta.env.VITE_HOST,
    port: parseInt(import.meta.env.VITE_PORT),
	auth: {
        user: import.meta.env.VITE_USER,
        pass: import.meta.env.VITE_PASS,
      },
});

export const sendMail = async (from: string, to: string, subject: string, text: string) => {
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        message.success('Your information is sent! Your ID is ' + info.messageId);
    } catch (error) {
        message.error('Error occurred while sending email' + error);
    }
}

export const sendMailInterval = async (childname: string, address: string, input: string) => {
    sendMail(
        'do_not_reply@northpole.com',
        'santa@northpole.com',
        'Pending wish',
        `
            Child's name: ${childname}
            Address: ${address}
            Wish: ${input}
        `);
}