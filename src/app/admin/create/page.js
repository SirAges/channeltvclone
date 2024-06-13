"use client";
import { Form } from "@/components";
import { useAxios } from "@/lib/useAxios";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { customToast } from "@/lib/customToast";
import { useState } from "react";
import * as z from "zod";
const CreatePage = () => {
  
    const { id, fullName } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const fieldsArray = [
        {
            id: "title",
            placeholder: "title",
            name: "title",
            label: "title",
            error: "title",
            type: "text",
            role: "title"
        },

        {
            id: "excerpt",
            placeholder: "excerpt",
            name: "excerpt",
            label: "excerpt",
            error: "excerpt",
            type: "text",
            role: "excerpt"
        },
        {
            id: "image",
            placeholder: "image",
            name: "image",
            label: "image",
            multiple: true,
            error: "image",
            type: "file",
            role: "image"
        },
        {
            id: "content",
            placeholder: "content",
            name: "content",
            label: "content",
            error: "content",
            type: "text",
            role: "content"
        },

        {
            id: "category",
            placeholder: "category",
            name: "category",
            label: "category",
            error: "category",
            type: "text",
            role: "category"
        },
        {
            id: "tags",
            placeholder: "tags",
            name: "tags",
            label: "tags",
            error: "tags",
            type: "text",
            role: "tags"
        }
    ];

    const initialValues = {
        title: "",
        excerpt: "",
        content: "",
        image: "",
        category: "",
        tags: "",
        author: ""
    };

    const schema = z.object({
        title: z
            .string()
            .min(10, { message: "Title must be at least 10 characters long" })
            .max(100, { message: "Title cannot exceed 40 characters" }),
        excerpt: z
            .string()
            .min(30, { message: "Excerpt must be at least 30 characters long" })
            .max(500, { message: "Excerpt cannot exceed 500 characters" }),
        content: z.string().min(300, {
            message: "content must be at least 300 characters long"
        }),
        image: z.string(z.string()).min(1, { message: "image is required" }),
        category: z.string().min(1, { message: "Category is required" }),
        tags: z.string().min(1, { message: "tag is required" })
    });

    const onSubmit = async val => {
        try {
            if (!id) {
                router.push(`/auth/login?origin=${pathname}`);
                return;
            }
            setIsLoading(true);
            const vals = { ...val, author: fullName };
            const res = await useAxios.post("/news", vals);
            console.log("res", res);
            if (res.status === 200) {
                customToast(res.data, "success");
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error", error);

            setIsLoading(false);
            customToast(error.response.data, "error");
        }
    };

    return (
        <div className="flex flex-col items-center pt-3 md:w-2/3">
            <p className="capitalize font-medium text-white bg-primary rounded-full py-3 px-4 w-fit">
                Create news
            </p>
            <Form
                from="create news"
                fieldsArray={fieldsArray}
                initialValues={initialValues}
                schema={schema}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
        </div>
    );
};
export default CreatePage;
