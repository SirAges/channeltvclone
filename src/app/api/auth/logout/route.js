import { connectToDB } from "@/lib/database";
import { cookies } from "next/headers";
export const POST = async () => {
  connectToDB();
  try {
    const cookie = cookies().get("channeltv");
    if (cookie === undefined || !cookie) {
      return new Response("no cookie", { status: 400 }); //No content
    }
    await cookies().delete("channeltv", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      path: "/",
    });
    return new Response("cookie cleared", { status: 200 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};
