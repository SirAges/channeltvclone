"use client";
import { useEffect, useState } from "react";
import { useAxios } from "@/lib/useAxios";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ScreenLoader } from "@/components";

import * as z from "zod";
import { formatDateAgo, htmlFrom, getUser } from "@/lib/utils";
import { emojiReactions } from "@/lib/data";
import { customToast } from "@/lib/customToast";
import {
    MessageCircle,
    Facebook,
    Instagram,
    Twitter,
    Loader
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { Share, Similar, Form } from "./";
const SingleNews = ({ newsId }) => {
    const [news, setNews] = useState({});
    const [comments, setComments] = useState([]);
    const { id, fullName } = useAuth();
    console.log("id", id);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const url = process.env.NEXT_PUBLIC_DOMAIN + pathname;
    const [loading, setLoading] = useState(false);
    const emojiRegex = new RegExp(emojiReactions.join("|"));

    const fieldsArray = [
        {
            id: "comment",
            placeholder: "comment",
            name: "comment",
            label: "comment",
            error: "comment",
            type: "text",
            role: "comment"
        }
    ];

    const initialValues = {
        comment: ""
    };

    const schema = z.object({
        comment: z
            .string()
            .min(3, { message: "comment must be at least 3 characters long" })
            .max(40, { message: "comment cannot exceed 40 characters" })
    });

    const onSubmit = async val => {
        try {
            if (!id) {
                router.push(`/auth/login?origin=${pathname}`);
                return;
            }
            setIsLoading(true);
            const vals = { ...val, name: fullName, userId: id };
            const res = await useAxios.post(`/news/${_id}/comments`, vals);

            console.log("res", res);
            if (res.status === 200) {
                customToast(res.data, "success");
                setIsLoading(false);
                setSuccess(prev => !prev);
            }
        } catch (error) {
            console.log("error", error);

            setIsLoading(false);
            customToast(error.response.data, "error");
        }
    };

    useEffect(() => {
        const getNews = async () => {
            try {
                if (newsId) {
                    setLoading(true);
                    const res = await useAxios.get(`/news/${newsId}`);

                    if (res.status === 200) {
                        setNews(res.data);
                        setLoading(false);
                    }
                }
            } catch (error) {
                customToast(error.response.data, "error");
            }
        };
        getNews();
    }, [newsId]);

    useEffect(() => {
        const getComments = async () => {
            try {
                if (newsId) {
                    setIsLoading(true);
                    const res = await useAxios.get(`/news/${newsId}/comments`);

                    if (res.status === 200) {
                        setComments(res.data);
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                customToast(error.response.data, "error");
            }
        };
        getComments();
    }, [success, newsId]);

    const {
        _id,
        title,
        excerpt,
        image,
        content,
        category,
        tags,
        author,
        createdAt,
        updatedAt
    } = news;
    const reactionCounts = comments.reduce((acc, comment) => {
        const reaction = comment.comment;
        acc[reaction] = (acc[reaction] || 0) + 1;
        return acc;
    }, {});
    if (loading) return <ScreenLoader />;
    return (
        news?._id && (
            <div className="flex flex-col mx-auto md:w-3/4">
                <div className="flex items-center space-x-3 px-2 py-3">
                    {category.split(",").map(t => (
                        <p
                            key={t}
                            className="capitalize text-md text-excerpt
                        font-medium"
                        >
                            {t}
                        </p>
                    ))}
                </div>
                <hr />
                <div className="relative w-full h-60 py-2">
                    <Image
                        className="object-cover"
                        src={image}
                        alt={title}
                        fill
                    />
                </div>
                <h3
                    className="font-bold capitalize text-
                 px-4 py-4 bg-background text-primary"
                >
                    {title}
                </h3>
                <p className="text-body  text-justify px-2 text-lg pb-3">
                    {excerpt}
                </p>
                <hr />
                <div className="flex flex-row items-center space-x-2 px-2">
                    <p className="capitalize text-md font-medium">By:</p>
                    <p className="lowercase text-sm font-medium">{author}</p>
                </div>
                <div className="flex flex-row items-center space-x-2 px-2 py-1">
                    <p className="capitalize text-md font-medium">Updated:</p>
                    <p className="lowercase text-sm font-medium text-excerpt">
                        {formatDateAgo(updatedAt)}
                    </p>
                </div>

                <Share url={url} />
                <hr />
                <div className="px-2 py-2">{htmlFrom(content)}</div>
                <hr />
                <div className="px-2 py-2">
                    <p className="capitalize font-semibold">In this article</p>
                    <div className="flex items-center space-x-3 px-2">
                        {tags.split(",").map(t => (
                            <Link
                                href={`/tags/?tags=${t}`}
                                key={t}
                                className="capitalize text-md text-primary
                                bg-card px-1 py-1 rounded-sm
                        font-medium"
                            >
                                {t}
                            </Link>
                        ))}
                    </div>
                </div>
                <hr />
                <div className="py-2 ">
                    <p className="capitalize font-semibold py-2 px-2">
                        more stories
                    </p>
                    <hr />

                    <Similar category={category} />
                </div>
                <hr />
                <div>
                    <p className="capitalize font-semibold py-2 text-center px-2">
                        what do you think
                    </p>
                    <hr />
                    <div
                        className="flex flex-row items-center justify-center
                        flex-wrap mx-auto
                    flex-row w-full px-6 py-4 md:w-2/4 gap-4"
                    >
                        {emojiReactions.map(e => (
                            <p
                                key={e}
                                className="text-2xl"
                                onClick={() => onSubmit({ comment: e })}
                            >
                                {e}
                            </p>
                        ))}
                    </div>

                    <Form
                        from="comment"
                        fieldsArray={fieldsArray}
                        initialValues={initialValues}
                        schema={schema}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    />
                    <div
                        className="flex flex-col md:w-2/4 mx-auto px-3 py-4 max-h-56
                    overflow-y-scroll appearance-none border rounded
                    text-gray-700 leading-tight mx-3 my-2
                                focus:outline-none focus:shadow-outline"
                    >
                        <div
                            className="flex flex-row items-center flex-wrap
                        gap-2"
                        >
                            {Object.entries(reactionCounts).map(
                                ([reaction, count]) =>
                                    emojiRegex.test(reaction) && (
                                        <div
                                            key={reaction}
                                            className="flex
                                        flex-row items-center space-x-1"
                                        >
                                            <p>{reaction}</p>
                                            <p>{count}</p>
                                        </div>
                                    )
                            )}
                        </div>
                        {comments.map(
                            c =>
                                !emojiRegex.test(c.comment) && (
                                    <div
                                        key={c._id}
                                        className="flex flex-col space-y-2 bg-card
                            rounded-md px-2 py-2 my-2"
                                    >
                                        <p className="text-primary font-semibold">
                                            {c.name}
                                        </p>
                                        <p className="px-2">{c.comment}</p>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default SingleNews;
