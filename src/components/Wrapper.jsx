"use client";
import { useState, useEffect, useRef } from "react";
import { useAxios } from "@/lib/useAxios";
import { newsdata } from "../lib/data";
import {
    Header,
    TopStory,
    Headlines,
    Separator,
    Morestory,
    Latest,
    DontMiss,
    Sport,
    Politics,
    World,
    ScreenLoader
} from "@/components";

const Wrapper = () => {
    const [dropdown, setDropdown] = useState(false);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [topStory, setTopStory] = useState({});
    const [headlines, setHeadlines] = useState([]);
    const [moreStory, setMoreStory] = useState([]);
    const [dontMiss, setDontMiss] = useState([]);
    const [latest, setLatest] = useState([]);
    const [sports, setSports] = useState([]);
    const [politics, setPolitics] = useState([]);
    const [world, setWorld] = useState([]);
    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true);
                const res = await useAxios.get("/news");

                const newsdata = res.data;

                if (res.status === 200 && newsdata) {
                    setNews(newsdata);
                    //top story
                    const topfiltered = newsdata.filter(f =>
                        f.category.includes("topstory")
                    );
                    if (topfiltered) {
                        const sorted = topfiltered.sort((a, b) => {
                            const dateA = new Date(a.createdAt);
                            const dateB = new Date(b.createdAt);
                            return dateA - dateB;
                        });
                        if (sorted) {
                            setTopStory(sorted[0]);
                        }
                        //headline
                        const headfiltered = newsdata.filter(f =>
                            f.category.includes("headlines")
                        );
                        if (headfiltered) {
                            const sorted = headfiltered.sort((a, b) => {
                                const dateA = new Date(a.createdAt);
                                const dateB = new Date(b.createdAt);
                                return dateA - dateB;
                            });
                            if (sorted) {
                                setHeadlines(sorted);
                            }
                        }

                        const worldfiltered = newsdata.filter(f =>
                            f.category.includes("world")
                        );
                        if (worldfiltered) {
                            const sorted = worldfiltered.sort((a, b) => {
                                const dateA = new Date(a.createdAt);
                                const dateB = new Date(b.createdAt);
                                return dateA - dateB;
                            });
                            if (sorted) {
                                setWorld(sorted);
                            }
                        }

                        const polfiltered = newsdata.filter(f =>
                            f.category.includes("politics")
                        );
                        if (polfiltered) {
                            const sorted = polfiltered.sort((a, b) => {
                                const dateA = new Date(a.createdAt);
                                const dateB = new Date(b.createdAt);
                                return dateA - dateB;
                            });
                            if (sorted) {
                                setPolitics(sorted);
                            }
                        }

                        const sportfiltered = newsdata.filter(f =>
                            f.category.includes("sport")
                        );
                        if (sportfiltered) {
                            const sorted = sportfiltered.sort((a, b) => {
                                const dateA = new Date(a.createdAt);
                                const dateB = new Date(b.createdAt);
                                return dateA - dateB;
                            });
                            if (sorted) {
                                setSports(sorted);
                            }
                        }

                        const missfiltered = newsdata.filter(f =>
                            f.category.includes("video")
                        );
                        if (missfiltered) {
                            const sorted = missfiltered.sort((a, b) => {
                                const dateA = new Date(a.createdAt);
                                const dateB = new Date(b.createdAt);
                                return dateA - dateB;
                            });
                            if (sorted) {
                                setDontMiss(sorted);
                            }
                        }

                        //more story
                        const morefiltered = newsdata.filter(f =>
                            f.category.includes("local")
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
                        //Latest
                        const sortedlatest = newsdata.sort((a, b) => {
                            const dateA = new Date(a.createdAt);
                            const dateB = new Date(b.createdAt);
                            return dateA - dateB;
                        });
                        if (sortedlatest) {
                            setLatest(sortedlatest.slice(0, 5));
                        }
                    }
                }
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };
        getNews();
        return () => false;
    }, []);

    if (loading) return <ScreenLoader />;
    return (
        <div className="">
            <Header dropdown={dropdown} setDropdown={setDropdown} />
            <div className="text-ellipsis2 overflow-hidden bg-card max-w-full">
                <p className=" marquee">
                    <strong>Disclaimer:</strong> This site is not the original
                    website of channels tv. It is a cloned site just for
                    educational purpose. All assets was gotten from channels
                    website. check out channels tv they have one of the best
                    news
                </p>
            </div>
            {!dropdown && (
                <div className="pb-4 flex flex-col space-y-8">
                    {topStory._id && <TopStory topStory={topStory} />}
                    {/*headlines*/}
                    {headlines.length ? (
                        <div>
                            <h2
                                className="font-bold capitalize
                 px-4 py-4 bg-background text-primary"
                            >
                                Headlines
                            </h2>
                            <div
                                className=" grid
                            grid-cols-1 md:grid-cols-2 gap-2"
                            >
                                {headlines.map((h, i) => (
                                    <Headlines key={i} headline={h} />
                                ))}
                            </div>
                            <div
                                className="grid
                            grid-cols-1 md:grid-cols-3 gap-2 mt-4"
                            >
                                {headlines.map((h, i) => (
                                    <Headlines headline={h} key={i} mini />
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {/*more stories*/}
                    {moreStory.length ? (
                        <div>
                            <h2
                                className="font-bold capitalize 
                 px-4 py-4 bg-background text-primary"
                            >
                                more stories
                            </h2>
                            <div className="grid                             grid-cols-1 md:grid-cols-2 gap-2">
                                {moreStory.map((m, i) => (
                                    <Morestory morestory={m} key={i} />
                                ))}
                            </div>
                            <div className="grid                             grid-cols-1 md:grid-cols-2 gap-2">
                                {moreStory.map((m, i) => (
                                    <Morestory morestory={m} mini key={i} />
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {/*latest*/}
                    {latest.length ? (
                        <div>
                            <h2
                                className="font-bold capitalize 
                 px-4 py-4 bg-background text-primary"
                            >
                                latest stories
                            </h2>
                            <div className="grid                             grid-cols-1 md:grid-cols-2 gap-2">
                                {latest.map((m, i) => (
                                    <Latest key={i} latest={m} />
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {/*dont miss*/}
                    {dontMiss.length ? (
                        <div className="">
                            <h2
                                className="font-bold capitalize 
                 px-4 py-4 mx-2 bg-primary w-fit text-white"
                            >
                                Dont Miss
                            </h2>
                            <div
                                className="flex flex-row items-center bg-primary h-fit
                        w-full max-h-fit
                         overflow-x-scroll  py-2 gap-2 overflow-y-hidden"
                            >
                                {dontMiss.map((m, i) => (
                                    <DontMiss key={i} dontmiss={m} />
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {/*sport*/}
                    {sports.length ? (
                        <div>
                            <h2
                                className="font-bold capitalize 
                 px-4 py-4 bg-background text-primary"
                            >
                                sports
                            </h2>
                            <div className="grid                             grid-cols-1 md:grid-cols-2 gap-2 px-6">
                                {sports.map((s, i) => (
                                    <Sport key={i} sport={s} />
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {/*politics*/}
                    {politics.length ? (
                        <div>
                            <h2
                                className="font-bold capitalize 
                 px-4 py-4 bg-background text-primary"
                            >
                                Politics
                            </h2>
                            <div className="grid                             grid-cols-1 md:grid-cols-2 gap-2 px-6">
                                {politics.map((p, i) => (
                                    <Politics
                                        key={i}
                                        politic={p}
                                        mini={i % i === 0 && i % 1 === 0}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                    {/*world*/}
                    {world.length ? (
                        <div>
                            <h2
                                className="font-bold capitalize 
                 px-4 py-4 bg-background text-primary"
                            >
                                world
                            </h2>
                            <div className="grid                             grid-cols-1 md:grid-cols-2 gap-2 px-6">
                                {world.map((s, i) => (
                                    <World key={i} world={s} />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};
export default Wrapper;
