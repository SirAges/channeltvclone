import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import CryptoJs from "crypto-js";

export const POST = async (request) => {
  const user = await request.json();
  console.log("user", user);
  const encPassword = CryptoJs.AES.encrypt(
    user.password,
    process.env.NEXT_PUBLIC_KEY,
  ).toString();

  try {
    await connectToDB();

    const foundUser = await User.findOne({ email: user.email });

    if (foundUser) {
      return new Response("duplicate user", { status: 500 });
    }
    const userToSave = { ...user, password: encPassword, username: user.email };
    const newUser = new User(userToSave);
    await newUser.save();
    const { email, _v, ...others } = newUser;
    return new Response(JSON.stringify(email), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to create  user" + error, { status: 500 });
  }
};
