import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
export const POST = async (request) => {
  connectToDB();
  const { email } = await request.json();

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.NEXT_PUBLIC_MAILER_USER,
      pass: process.env.NEXT_PUBLIC_MAILER_PASSWORD,
    },
  });
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return new Response("email was not registered", { status: 404 });
  }

  const generateOTP = (length) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsetLength = charset.length;
    let otp = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      otp += charset[randomIndex];
    }
    return otp;
  };

  const otp = generateOTP(6);
  const token = await jwt.sign(
    {
      id: foundUser._id,
      otp,
    },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" },
  );

  const mailOptions = {
    from: "ekelestephen.design@gmail.com", // sender address
    to: email, // list of receivers
    subject: "reset password",

    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc;">
    <div style="background-color: #022d62; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0;">Your One Time Reset Password</h1>
    </div>
    <div style="background-color: #ffffff; padding: 20px;">
      <p>Hello Dear,</p>
      <p>Do not disclose your otp to anybody, only use it to reset your password:</p>
      <p style="display: inline-block; background-color: #022d62; color: #ffffff; text-decoration: none; padding: 10px 20px; margin-top: 20px; border-radius: 5px;">${otp}</p>
      <p style="margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  </div>`,
  };
  try {
    const info = await transport.sendMail(mailOptions);
    return new Response(JSON.stringify(token), { status: 200 });
  } catch (error) {
    return new Response("failed to send message", { status: 500 });
  }
};
