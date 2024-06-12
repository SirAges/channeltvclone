import { connectToDB } from "@/lib/database";
import User from "@/models/user";

export const GET = async (request) => {
  try {
    await connectToDB();

    const users = await User.find();

    return new Response(
      JSON.stringify(users),

      { status: 200 },
    );
  } catch (error) {
    return new Response("Failed to fetch users", {
      status: 500,
    });
  }
};
export const POST = async (request) => {
  const user = await request.json();

  try {
    await connectToDB();
    const newUser = new User(user);

    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(error + "Failed to create a new user", {
      status: 500,
    });
  }
};
