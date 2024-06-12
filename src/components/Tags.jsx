"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScreenLoader } from "@/components";
import { useAxios } from "@/lib/useAxios";
const Tag = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const tags = searchParams.get("tags");

    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true);
                const res = await useAxios.get(`/news?tags=${tags.trim()}`);

                if (res.status === 200) {
                    setNews(res.data);
                    setLoading(false);
                }
            } catch (error) {
                console.log("error", error);
                setLoading(false);
            }
        };
        getNews();
        return () => false;
    }, [tags]);

    if (!news.length && !loading) {
        return (
            <div
                className="flex flex-col items-center justify-center
            space-y-4  md:text-3xl flex-1 min-h-screen bg-card"
            >
                <Link href="/" className="relative h-12 w-12">
                    <Image
                        className="object-cover"
                        src="/assets/images/tvlogo.png"
                        alt="logo"
                        fill
                    />
                </Link>
                <div
                    className="flex flex-row flex-wrap items-center
                    justify-center text-xl gap-2 font-semibold
            text-primary "
                >
                    <p>No news for</p>
                    <p> {tags}</p> <p>tags</p>
                </div>
            </div>
        );
    }
    if (loading) return <ScreenLoader />;
    return news.length ? (
        <div className="flex flex-col w-full px-20">
            <h5
                className="font-bold capitalize
                 px-4 py-4 bg-background text-primary top-0 sticky z-40"
            >
                {tags} now
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {news.map(({ _id, title, image }) => (
                    <Link
                        key={_id}
                        href={`/news/${_id}`}
                        className="flex flex-col  items-center"
                    >
                        <div className="relative w-full h-60">
                            <Image
                                className="object-cover"
                                src={image}
                                alt={title}
                                fill
                            />
                        </div>
                        <div className="px-2 py-2">
                            <h4 className="text-primary font-bold capitalize">
                                {title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) : null;
};
export default Tag;
