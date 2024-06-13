"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion from Framer Motion
import Image from "next/image";
import Link from "next/link";

import { Menu, Search } from "lucide-react";
const Header = ({ dropdown, setDropdown }) => {
    const [cat, setCat] = useState(null);
    const [search, setSearch] = useState("");
    const menus = [
        "Business",
        "Crime",
        "Entertainment",
        "Opinion",
        "Podcast",
        "Politics",
        "Programmes",
        "Sport",
        "Tech",
        "World",
        "More"
    ];
    return (
        <div
            className="flex flex-col w-full  items-end
          
             top-0 sticky z-50"
        >
            <div className="flex flex-row px-4 h-16 bg-primary w-full items-center justify-between">
                <Link href="/" className="relative h-12 w-12">
                    <Image
                        priority
                        className="object-cover"
                        src="/assets/images/tvlogo.png"
                        alt="logo"
                        fill
                    />
                </Link>
                <div className="flex flex-row items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <Link
                            href="/live"
                            className="px-3 text-accent capitalize"
                        >
                            Live tv
                        </Link>
                        <span className="bg-red-500 rounded-full w-1.5 h-1.5" />
                    </div>
                    <Menu
                        onClick={() => setDropdown(prev => !prev)}
                        className="text-accent"
                    />
                </div>
            </div>

            {/* Apply slide-down animation to the dropdown content */}
            <AnimatePresence>
                {dropdown && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 flex flex-col space-y-4 bg-primary
                         md:w-2/5"
                    >
                        <form className="flex flex-col">
                            <label htmlFor="search" className="hidden">
                                search
                            </label>
                            <div className="flex flex-row items-center space-x-4 ">
                                <input
                                    className="flex-1 rounded-lg bg-card px-3
                                    py-2 placeholder:text-white text-white
                            focus:outline outline-2 outline-accent/50"
                                    id="search"
                                    type="text"
                                    name="search"
                                    placeholder="search"
                                    autocomplete="off"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <Link href={`/search?search=${search}`}>
                                    <Search
                                        className="border border-accent h-10 w-10
                            text-accent rounded-lg p-2 "
                                        size={16}
                                    />
                                </Link>
                            </div>
                        </form>
                        <div className="flex flex-row flex-wrap items-center">
                            {menus.map(c => (
                                <div
                                    key={c}
                                    className=" flex flex-col items-center w-1/2 p-1"
                                >
                                    <Link
                                        href={`/category?category=${c}`}
                                        className="bg-card rounded-lg px-3 py-2
                                text-accent capitalize w-full text-center"
                                    >
                                        {c}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default Header;
