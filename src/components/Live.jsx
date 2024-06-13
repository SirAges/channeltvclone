"use client";
import {  useState, useEffect } from "react";

import YouTube from "react-youtube";
import { ScreenLoader } from "@/components";
import Link from "next/link";

const Live = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        // Set initial width and height
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);

        // Add event listener to update width and height on resize
        window.addEventListener("resize", handleResize);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const opts = {
        height: height,
        width: width,
        playerVars: {
            autoplay: 0
        }
    };

    return (
        <div className="flex flex-1">
            <YouTube
                videoId={"W8nThq62Vb4"}
                id={"W8nThq62Vb4"}
                title={"channels live stream"}
                opts={opts}
                loading={<ScreenLoader />}
            />
        </div>
    );
};
export default Live;
