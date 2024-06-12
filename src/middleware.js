import { verifyAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const originStr = `${process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN.replace(
    /[\s\t\n]+/g,
    ""
)}`;
const allowedOrigins = originStr.split(",");
export async function middleware(req) {
    const res = NextResponse.next();
    const path = req.nextUrl.pathname;
    const key = req.nextUrl.searchParams.get("key");
    //   const cookieStore = cookies()
    // const theme = cookieStore.get('theme')

    const btoken = req.headers.get("authorization");
    const token = btoken?.replace("Bearer ", "");



    const verifiedToken =
        token &&
        (await verifyAuth(token).catch(err => {
            console.log("err", err);
        }));
    const role = verifiedToken?.roles;

    
    
    const method = req.method;
    const deleteMethod = method === "DELETE";
    const patchMethod = method === "PATCH";
    const postMethod = method === "POST";
    const getMethod = method === "GET";

    const isprivatePath = path.startsWith("/admin");
    const isApiPath = path.startsWith("/api");
    const user = role?.includes("user");
   
    
    if (isprivatePath && user) {
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
    if (isApiPath && (deleteMethod || patchMethod) && user) {
        return new NextResponse("Access denied: You are not authorized", {
            status: 403
        });
    }
    const origin = req.headers.get("origin");

    // if the origin is an allowed one,
    // add it to the 'Access-Control-Allow-Origin' header
    if (allowedOrigins.includes(origin)) {
        res.headers.append("Access-Control-Allow-Origin", origin);
    }

    // add the remaining CORS headers to the response
    res.headers.append(
        "Access-Control-Allow-Credentials",
        process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_CREDENTIALS
    );
    res.headers.append(
        "Access-Control-Allow-Methods",
        `${process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_METHODS.replace(
            /[\s\t\n]+/g,
            ""
        )}`
    );
    res.headers.append(
        "Access-Control-Allow-Headers",
        `${process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_HEADERS.replace(
            /[\s\t\n]+/g,
            ""
        )}`
    );

    return res;
}

export const config = {
    matcher: ["/admin/:path*", "/api/:path*"]
};
