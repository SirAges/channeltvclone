import { Color } from "@tiptap/extension-color";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import SuperscriptExt from "@tiptap/extension-superscript";
import SubscriptExt from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";

import StarterKit from "@tiptap/starter-kit";
import YoutubeExt from "@tiptap/extension-youtube";
export const extensions = [
    ImageExt.configure({
        inline: true
    }),
    SuperscriptExt.configure({}),
    SubscriptExt.configure({}),
    TextAlign.configure({
        types: ["heading", "paragraph"]
    }),

    YoutubeExt.configure({
        controls: false,
        inline: true,
        nocookie: true,
        allowFullscreen: false,
        autoplay: true,
        disableKBcontrols: true,
        HTMLAttributes: {
            class: "w-full max-w-full h-44 max-h-44"
        }
    }),
    LinkExt.configure({
        HTMLAttributes: {
            class: "link"
        },

        protocols: [],
        autolink: true,
        openOnClick: true,
        linkOnPaste: true
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({
        HTMLAttributes: {
            class: "text-primary underline"
        },
        types: [ListItem.name]
    }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        }
    })
];
