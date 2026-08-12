'use server';

import { ContactFormProps } from '@/@types/contactForm';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendEmail({ name, email, message, subject }: ContactFormProps) {
    try {
        // 2. Send email with defined transport object
        await transporter.sendMail({
            from: `My Portfolio <${process.env.SMTP_USER}>`,
            to: "manikbabu.dev@gmail.com",
            subject: subject,
            text: message,
            html: `<p>From: ${email}</p><h3>${name}</h3><p>${message}</p>`,
        });

        return { ok: true };
    } catch (error) {
        console.error("Email error:", error);
        return { ok: false, error: "Failed to send message" };
    }
}
