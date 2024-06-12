"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const DontMiss = ({ dontmiss }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
    };

    const { image, title } = dontmiss;
    return (
        <motion.div
            className="flex flex-col space-y-6  min-w-full"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration: 0.5 }}
        >
            <Link
                href={`/news/${_id}`}
                className="flex flex-col md:flex-row items-center"
            >
                <div className="relative w-full h-60">
                    <Image
                        className="object-cover"
                        src={image}
                        alt={title}
                        fill
                        priority
                    />
                </div>

                <h4 className="text-accent font-bold text-md capitalize px-3">
                    {title}
                </h4>
            </Link>
        </motion.div>
    );
};
export default DontMiss;
