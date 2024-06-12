import { connectToDB } from "@/lib/database";
import News from "@/models/news";

export const GET = async (request, { params }) => {
    const { newsId, commentId } = params;

    try {
        await connectToDB();
        const news = await News.findOne(
            { _id: newsId, "comments._id": commentId },
            { "comments.$": 1 }
        ).populate({
                path: "comments.userId",
                model: "User"
            })
            .exec();
      
        if (!news) return new Response("Comment Not Found", { status: 404 });

        return new Response(JSON.stringify(news.comments[0]), {
            status: 200
        });
    } catch (error) {
        return new Response("Error getting Comment, Internal server error", {
            status: 500
        });
    }
};

export const PATCH = async (request, { params }) => {
    const { newsId, commentId } = params;
    const comment = await request.json();

    try {
        await connectToDB();

        const updateFields = {};

        // Iterate over fields in the commentData and add to updateFields
        for (const key in comment) {
            if (Object.prototype.hasOwnProperty.call(comment, key)) {
                updateFields[`comments.$.${key}`] = comment[key];
            }
        }

        const result = await News.findOneAndUpdate(
            { _id: newsId, "comments._id": commentId },
            updateFields, // Use the entire updateFields object
            { new: true, omitUndefined: true, runValidators: true }
        );

        return result
            ? new Response("Successfully updated the Comment", {
                  status: 200
              })
            : new Response("Comment Not Found", { status: 404 });
    } catch (error) {
        return new Response("Error Updating Comment: " + error, {
            status: 500
        });
    }
};

export const DELETE = async (request, { params }) => {
    const { newsId, commentId } = params;

    try {
        await connectToDB();
        const result = await News.updateOne(
            { _id: newsId },
            { $pull: { comments: { _id: commentId } } }
        );

        if (result.nModified === 0)
            return new Response("Comment Not Found", { status: 404 });

        return new Response("Successfully deleted the Comments", {
            status: 200
        });
    } catch (error) {
        return new Response("Error Deleting Comment", { status: 500 });
    }
};
