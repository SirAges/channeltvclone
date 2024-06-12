import { connectToDB } from "@/lib/database";
import News from "@/models/news.js";

export const GET = async (request, { params }) => {
    const { newsId } = params;

    try {
        await connectToDB();
        const news = await News.findOne({ _id: newsId });

        if (!news)
            return new Response(`News with id not found ${newsId}`, {
                status: 404
            });

        const comments = news.comments;
        if (!comments)
            return new Response(`comments with id not found`, {
                status: 404
            });

        return new Response(JSON.stringify(comments), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to fetch comments: " + error, {
            status: 500
        });
    }
};

export const POST = async (request, { params }) => {
    const { newsId } = params;
    const   comment  = await request.json();
  
    try {
        await connectToDB();

        // Check if a comment with the same userId exists
        const existingComment = await News.findOne({
            _id: newsId,
            "comments.userId": comment.userId
        });

        // if (existingComment) {
        //     return new Response("Comment with userId already exists", {
        //         status: 400
        //     });
        // }

        const news = await News.findOneAndUpdate(
            { _id: newsId },
            { $push: { comments: comment } },
            { new: true }
        );

        if (!news)
            return new Response("News or Comment Not Found", {
                status: 404
            });

        return new Response("Comment added successfully", {
            status: 200
        });
    } catch (error) {
        return new Response("Error adding comment, Internal server error", {
            status: 500
        });
    }
};
