import { jwtVerify } from "jose";
import { jwtDecode } from "jwt-decode";
export const getJwtSecretKey = async () => {
    const secret = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;
    console.log("secret", secret);
    if (!secret || secret.length === 0) {
        throw new Error("no secret key");
    }
    return secret;
};

export const verifyAuth = async token => {
    try {
      

        const decoded = jwtDecode(token);

        return decoded;
    } catch (error) {
        console.log("error", error);
        throw new Error("opps error occured");
    }
};
