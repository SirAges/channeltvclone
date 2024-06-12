import { connectToDB } from "@/lib/database";

import News from "@/models/news";
import User from "@/models/user";

export const GET = async (request, { params }) => {
    const { newsId } = params;

    try {
        await connectToDB();

        const news = await News.findById(newsId);
    

        

        if (!news) return new Response("News Not Found", { status: 404 });

        return new Response(JSON.stringify(news), { status: 200 });
    } catch (error) {
        console.log("error", error);
        return new Response("Error getting News, Internal server error", {
            status: 500
        });
    }
};

export const PATCH = async (request, { params }) => {
    const { newsId } = params;
    const updatedNewsData = await request.json();

    try {
        await connectToDB();

        // Find the existing news by ID
        let existingNews = await News.findById(newsId);

        if (!existingNews) {
            return new Response("News not found", { status: 404 });
        }

        // Update the news with new data using the set method
        existingNews.set(updatedNewsData);

        await existingNews.save();

        return new Response("Successfully updated the News", {
            status: 200
        });
    } catch (error) {
        return new Response("Error Updating News", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const { newsId } = params;

    try {
        await connectToDB();

        // Find the news by ID and remove it
        const deletedNews = await News.findOneAndDelete({
            _id: newsId
        });

        if (!deletedNews) {
            return new Response("News not found", { status: 404 });
        }

        return new Response("News deleted successfully", {
            status: 200
        });
    } catch (error) {
        return new Response("Error deleting news", { status: 500 });
    }
};
