"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import React from "react";
import { extensions } from "../lib/editorExtensions";
import { MenuBar } from "../lib/editorIcons";
import { useEffect, useState } from "react";

const content =""

const RichTextEditor = ({ id, setValue }) => {
    const [inputvalue, setInputvalue] = useState("");
    const [inputbox, setInputbox] = useState(false);
    const [idx, setIdx] = useState("");
    const editor = useEditor({
        extensions,
        content,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            const html = editor.getHTML();
            setValue(id, html);
        }
    });

    const handleInput = e => {
        if (idx === "link") {
            editor
                .chain()
                .focus()
                .toggleLink({
                    href: inputvalue,
                    target: "_blank"
                })
                .run();
            setInputvalue("");
            setInputbox(false);
        }

        if (idx === "youtube") {
            editor
                .chain()
                .focus()
                .setYoutubeVideo({ src: inputvalue, width: 640, height: 200 })
                .run();
            setInputvalue("");
            setInputbox(false);
        }
    };

    return (
        <div
            className=" appearance-none border rounded w-full py-2 px-3
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        min-h-[300px]"
        >
            <div className="flex flex-row flex-wrap items-center gap-2 px-2 py-2">
                <MenuBar
                    idx={idx}
                    setIdx={setIdx}
                    setInputbox={setInputbox}
                    inputbox={inputbox}
                    editor={editor}
                />
            </div>
            {inputbox && (
                <div>
                    <label
                        htmlFor={"input"}
                        className="capitalize block text-gray-700 text-sm
                        font-medium mb-2"
                    >
                        {idx}
                    </label>
                    <div className="flex flex-row items-center">
                        <input
                            id="input"
                            value={inputvalue}
                            onChange={e => setInputvalue(e.target.value)}
                            type="text"
                            accept="image/*"
                            placeholder="http://example.com"
                            className=" appearance-none flex-1 border
                            rounded-l-md w-full py-3 px-3 text-gray-700
                            leading-tight focus:outline-none
                            focus:shadow-outline"
                        />
                        <h1
                            className="bg-primary rounded-r-md px-2 py-3
                        text-white appearance-none border focus:outline-none focus:shadow-outline"
                            onClick={handleInput}
                        >
                            set
                        </h1>
                    </div>
                    <hr className="my-2" />
                </div>
            )}

            <EditorContent className="flex-1" editor={editor} />
        </div>
    );
};
export default RichTextEditor;
