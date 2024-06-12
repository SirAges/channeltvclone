import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import { serialize } from "cookie";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken"
export const POST = async request => {
    const user = await request.json();
    const { password, email } = user;

    try {
        connectToDB();

        if (!email || !password) {
            return new Response("All fields are required", { status: 400 });
        }

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return new Response("user is not found", { status: 401 });
        }
        const rawPassword = CryptoJs.AES.decrypt(
            foundUser.password,
            process.env.NEXT_PUBLIC_KEY
        );
        const decPassword = rawPassword.toString(CryptoJs.enc.Utf8);

        const match = decPassword === password;

        if (!match) {
            return new Response("user is Unauthorized", { status: 401 });
        }
      
        const accessToken = await jwt.sign(
            {
                id: foundUser._id,
                roles: foundUser.roles,
                email: foundUser.email,
                fullName: `${foundUser.firstName} ${foundUser.lastName}`
            },
            process.env.NEXT_PUBLIC_KEY,
            { expiresIn: "10s" }
        );

        const refreshToken = await jwt.sign(
            {
                id: foundUser._id,

                roles: foundUser.roles
            },
            process.env.NEXT_PUBLIC_KEY,
            { expiresIn: "1d" }
        );

        const seralized = serialize("channeltv", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        });

        const response = {
            message: "Authenticated!"
        };

        return new Response(JSON.stringify(accessToken), {
            status: 200,
            headers: { "Set-Cookie": seralized }
        });
    } catch (error) {
        console.log("errlogin", error);
        return new Response("an error occured , server error" + error, {
            status: 500
        });
    }
};
