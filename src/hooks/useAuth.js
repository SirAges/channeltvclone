import { jwtDecode } from "jwt-decode";
import { customToast } from "@/lib/customToast";
import { token } from "../../token.json"; //
export const useAuth = () => {
    console.log("token", token);
    let isOwner = false;
    let isAdmin = false;
    let isCreator = false;
    let isModerator = false;
    let status = "";

    try {
        if (token) {
            const decoded = jwtDecode(token);

            const exp = new Date(decoded?.exp);
            const cur = Math.floor(new Date() / 1000);

            const isExpired = exp - cur < 0;
            if (isExpired) {
                return {
                    id: null,
                    role: [],
                    fullName: "",
                    isAdmin: false,
                    isCreator: false,
                    isOwner: false,
                    isModerator: false,
                    status: ""
                };
            }
            const { id, roles, email, fullName } = decoded;

            isAdmin = roles.includes("admin");
            isOwner = roles.includes("owner");
            isCreator = roles.includes("creator");
            isModerator = roles.includes("moderator");

            if (isOwner) {
                status = "owner";
            } else if (isAdmin) {
                status = "admin";
            } else if (isCreator) {
                status = "creator";
            } else {
                status = "moderator";
            }

            if (id) {
                return {
                    id,
                    isAdmin,
                    fullName,
                    isCreator,
                    isOwner,
                    isModerator,
                    status
                };
            }
        }
    } catch (error) {
        console.log("error", error);
    }

    return {
        id: null,
        role: [],
        fullName: "",
        isAdmin: false,
        isCreator: false,
        isOwner: false,
        isModerator: false,
        status: ""
    };
};
