import { Schema, model, models } from "mongoose";

const NewsSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String,
                    required: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String },
        tags: { type: String },
        category: { type: String, required: true },
        comments: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },  name: { type: String, required: true },
                comment: { type: String, required: true }
            }
        ]
    },
    { timestamps: true }
);

const News = models.News || model("News", NewsSchema);
export default News;
