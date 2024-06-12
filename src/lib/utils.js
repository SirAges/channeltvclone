import { format, formatDistanceToNow } from "date-fns";
import { useAxios } from "@/lib/useAxios";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
export const formatDates = dateString => {
    try {
        if (!dateString) {
            throw new Error("Invalid date: dateString is empty");
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date: dateString is not a valid date");
        }

        return format(date, "yyyy-MM-dd HH:mm:ss");
    } catch (error) {
        console.error("Error in formatDates function:", error.message);
        return null; // or handle the error as appropriate for your application
    }
};

export const formatDateAgo = dateString => {
    try {
        if (!dateString) {
            throw new Error("Invalid date: dateString is empty or undefined");
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date: dateString is not a valid date");
        }

        return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
        console.error("Error in formatDateAgo function:", error.message);
        return null; // or handle the error as appropriate for your application
    }
};
export const htmlFrom = htmlString => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
        USE_PROFILES: { html: true }
    });
    const html = parse(cleanHtmlString);
    return html;
};

export const getUser = async (id, key) => {
    console.log("id", id);
    const res = await useAxios.get(`/users/${id}`);
    if (res.status === 200) {
        const { data } = res;
        return key ? data[key] : data;
    }
};
