import axios from "axios";
import Cookies from "js-cookie";

// Function to retrieve the token from the cookie
const token = Cookies.get("token");
export const useAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN + "/api",
    timeout: 60000,
    headers: {
        authorization:
            token && token !== undefined && token ? `Bearer ${token}` : "", // Add token as authorization header if available
        accept: "application/json",
        "Content-Type": "application/json"
    }
});
