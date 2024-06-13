// import { token } from "../../token.json";
import axios from "axios";
const token = sessionStorage.getItem("token");
export const useAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN + "/api",
    timeout: 60000,
    headers: {
        authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json"
    }
});
