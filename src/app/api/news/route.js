import { connectToDB } from "@/lib/database";

import News from "@/models/news";

export const GET = async request => {
    const limit = request.nextUrl.searchParams.get("limit");
    const category = request.nextUrl.searchParams.get("category");
    const tags = request.nextUrl.searchParams.get("tags");
    const search = request.nextUrl.searchParams.get("search");

    try {
        await connectToDB();
        let news;
        if (limit) {
            news = await News.find().limit(limit).exec();
        } else if (category) {
            news = await News.find({
                category: { $regex: new RegExp(category, "i") }
            })
                .sort({ createdAt: "desc" })
                .exec();
        } else if (tags) {
            news = await News.find({
                tags: { $regex: new RegExp(tags, "i") }
            })
                .sort({ createdAt: "desc" })
                .exec();
        } else if (search) {
            news = await News.find({
                $or: [
                    { title: { $regex: new RegExp(search, "i") } },
                    { excerpt: { $regex: new RegExp(search, "i") } },
                    { content: { $regex: new RegExp(search, "i") } },
                    { tags: { $regex: new RegExp(search, "i") } },
                    { category: { $regex: new RegExp(search, "i") } }
                ]
            })
                .sort({ createdAt: "desc" })
                .exec();
        } else {
            news = await News.find().sort({ createdAt: "desc" }).exec();
        }
        return new Response(
            JSON.stringify(news),

            { status: 200 }
        );
    } catch (error) {
        return new Response("Failed to fetch  news", {
            status: 500
        });
    }
};
export const POST = async request => {
    const news = await request.json();

    try {
        await connectToDB();
        const newNews = new News(news);

        await newNews.save();
        return new Response("news created successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to create a new news", {
            status: 500
        });
    }
};
