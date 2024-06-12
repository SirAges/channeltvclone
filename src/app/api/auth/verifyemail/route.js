import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
export const POST = async request => {
    const registers = await request.json();
    const { email, password, firstName, lastName } = registers;
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.NEXT_PUBLIC_MAILER_USER,
            pass: process.env.NEXT_PUBLIC_MAILER_PASSWORD
        }
    });
    const token = await jwt.sign(
        {
            email,

            password,
            lastName,
            firstName
        },
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    );

    const mailOptions = {
        from: "ekelestephen.design@gmail.com", // sender address
        to: email, // list of receivers
        subject: "email verification",

        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc;">
    <div style="background-color: #022d62; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0;">Verify Your Email Address</h1>
    </div>
    <div style="background-color: #ffffff; padding: 20px;">
      <p>Hello Dear,</p>
      <p>Thank you for signing up. To complete your registration, please click the link below to verify your email address:</p>
      <a href="${process.env.NEXT_PUBLIC_DOMAIN}/auth/verifyemail?token=${token}" style="display: inline-block; background-color: #022d62; color: #ffffff; text-decoration: none; padding: 10px 20px; margin-top: 20px; border-radius: 5px;">Verify Email Address</a>
      <p style="margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  </div>`
    };
    try {
        const info = await transport.sendMail(mailOptions);
        return new Response("message sent successfully", { status: 200 });
    } catch (error) {
        return new Response("failed to send message", { status: 500 });
    }
};
