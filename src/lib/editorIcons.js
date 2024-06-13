import { useEffect, useState } from "react";
import { useAxios } from "@/lib/useAxios";
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    RemoveFormatting,
    RouteOff,
    Pilcrow,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    ListChecks,
    ListOrdered,
    Loader,
    Braces,
    Quote,
    SeparatorHorizontal,
    CornerDownLeft,
    Undo,
    Redo,
    Palette,
    Images,
    Link,
    Superscript,
    Subscript,
    AlignRight,
    AlignLeft,
    AlignCenter,
    AlignJustify,
    Youtube
} from "lucide-react";
export const MenuBar = ({ editor, setInputbox, inputbox, setIdx, idx }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoading, setImagesLoading] = useState(false);
    if (!editor) {
        return null;
    }

    const handleImage = e => {
        setImagesLoading(true);
        const file = e.target.files[0];

        if (!file) return;

        if (!file?.type?.includes("image")) {
            alert("Please select only image files.");
            return;
        }

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const result = reader.result;

                if (result) {
                    const res = await uploadImage(result);

                    if (res) {
                        // editor.chain().focus().setImage({ src: res }).run();
                        editor
                            .chain()
                            .focus()
                            .insertContent(
                                `<div className="relative rounded-lg w-72
                                h-60"> <Image className="object-center rounded-lg" src=${res} alt="images" fill priority/>
                                </div>`
                            )
                            .run();
                        setImagesLoading(false);
                    }
                }
            };
        } catch (error) {
            console.log("error", error);
            setImagesLoading(false);
        }
    };
    const uploadImage = async path => {
        try {
            const { data } = await useAxios.post(
                "/upload",
                JSON.stringify({ path })
            );
            return data;
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleColor = e => {
        editor.chain().focus().setColor(e.target.value).run();
    };

    const handleInputBox = clicked => {
        if (inputbox && idx !== clicked) {
            setIdx(clicked);
        } else if (inputbox && idx === clicked) {
            setInputbox(false);
        } else {
            setIdx(clicked);
            setInputbox(true);
        }
    };

    return (
        <>
            <Bold
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={
                    editor.isActive("bold")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Italic
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={
                    editor.isActive("italic")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Strikethrough
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={
                    editor.isActive("strike")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Code
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={
                    editor.isActive("code")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <RemoveFormatting
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
            />

            <RouteOff
                onClick={() => editor.chain().focus().clearNodes().run()}
            />

            <Pilcrow
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={
                    editor.isActive("paragraph")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Heading1
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                    editor.isActive("heading", { level: 1 })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Heading2
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                    editor.isActive("heading", { level: 2 })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Heading3
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                    editor.isActive("heading", { level: 3 })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Heading4
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                    editor.isActive("heading", { level: 4 })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Heading5
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={
                    editor.isActive("heading", { level: 5 })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Heading6
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={
                    editor.isActive("heading", { level: 6 })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <ListChecks
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                    editor.isActive("bulletList")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <ListOrdered
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                    editor.isActive("orderedList")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Braces
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={
                    editor.isActive("codeBlock")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Quote
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={
                    editor.isActive("blockquote")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <SeparatorHorizontal
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            />

            <CornerDownLeft
                onClick={() => editor.chain().focus().setHardBreak().run()}
            />

            <Undo
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            />

            <Redo
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            />
            <label htmlFor="color">
                <Palette
                    className={
                        editor.isActive("textStyle", { color: "#958DF1" })
                            ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                            : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                    }
                />
            </label>
            <input
                type="color"
                id="color"
                name="color"
                onChange={handleColor}
                list="colorOptions"
                className="hidden"
            />
            <datalist id="colorOptions">
                <option>#FF0000</option>
                <option>#00FF00</option>
                <option>#0000FF</option>
                <option>#FFFF00</option>
                <option>#FFA500</option>
                <option>#FFC0CB</option>
                <option>#800080</option>
                <option>#FF4500</option>
                <option>#00CED1</option>
                <option>#008080</option>
                <option>#FFD700</option>
                <option>#A52A2A</option>
            </datalist>
            <label htmlFor="editorimage">
                <Images className=" text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm" />
            </label>
            <input
                id="editorimage"
                onChange={handleImage}
                type="file"
                accept="image/*"
                className="hidden"
            />
            <Link
                onClick={() => handleInputBox("link")}
                className={
                    editor.isActive("link", { color: "#958DF1" })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />
            <Subscript
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={
                    editor.isActive("subscript", { color: "#958DF1" })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />
            <Superscript
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={
                    editor.isActive("superscript", { color: "#958DF1" })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />
            <AlignLeft
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={
                    editor.isActive({ textAlign: "left" })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />
            <AlignCenter
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={
                    editor.isActive({ textAlign: "center" })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />
            <AlignRight
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={
                    editor.isActive({ textAlign: "right" })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />
            <AlignJustify
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                    editor.isActive({ textAlign: "justify" })
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            <Youtube
                onClick={() => handleInputBox("youtube")}
                className={
                    editor.isActive("youtube")
                        ? "bg-primary text-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                        : " text-primary bg-white rounded-md h-8 w-8 p-1 shadow-black/10 shadow-sm"
                }
            />

            {imageLoading && <Loader className="animate-spin text-primary" />}
        </>
    );
};
