"use client";
import { useEffect, useState } from "react";
import { useAxios } from "@/lib/useAxios";
import Image from "next/image";
import Link from "next/link";
const Similar = ({ category }) => {
    const [moreStory, setMoreStory] = useState([]);
    useEffect(() => {
        const getNews = async () => {
            const res = await useAxios.get("/news");

            const newsdata = res.data;
            const morefiltered = newsdata.filter(f =>
                f.category.split(",").some(c => category.includes(c))
            );
            if (morefiltered) {
                const sorted = morefiltered.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateA - dateB;
                });
                if (sorted) {
                    setMoreStory(sorted);
                }
            }
        };
        getNews();
    }, [category]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {moreStory.slice(0, 4).map(({ _id, title, image }) => (
                <Link
                    key={_id}
                    href={`/news/${_id}`}
                    className="flex flex-row items-start"
                >
                    <div className="relative rounded-lg w-20 h-20">
                        <Image
                            className="object-cover rounded-lg"
                            src={image}
                            alt={title}
                            fill
                            priority
                        />
                    </div>
                    <div className="px-2 flex-1">
                        <h4 className="text-primary font-semibold  capitalize">
                            {title}
                        </h4>
                    </div>
                </Link>
            ))}
        </div>
    );
};
export default Similar;
