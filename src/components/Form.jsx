"use client";

import { useAxios } from "@/lib/useAxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Trash, Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { RichTextEditor } from "./";
const Form = ({
    isLoading,
    fieldsArray,
    from,
    initialValues,
    schema,
    onSubmit
}) => {
    const [imageLoading, setImagesLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: initialValues
    });

    useEffect(() => {
        fieldsArray.forEach(({ id }) => {
            watch(id);
        });
    }, [fieldsArray, watch, reset]);

    const handleReset = () => {
        reset(initialValues);
    };
    const passwordMatch = watch("password") === watch("confirmpassword");
    const handleInputChange = async (e, id, type) => {
        const docs = "file";

        if (type === docs) {
            const file = e.target.files[0];

            setImagesLoading(true);

            if (!file) return;

            if (!file.type.includes("image")) {
                alert("Please select only image files.");
                return;
            }
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async () => {
                    const result = reader.result;
                    if (result) {
                        const res = await uploadImage(reader.result);
                        if (res) {
                            setValue(id, res);
                            setImagesLoading(false);
                        }
                    }
                };
            } catch (error) {
                throw new Error(error.message);
                setImagesLoading(false);
            } finally {
            }
        } else {
            setValue(id, e.target.value);
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

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md w-full mx-auto my-6 px-3"
            >
                {isLoading && (
                    <div
                        className="w-full flex flex-row items-center
              py-3"
                    >
                        <Loader
                            className={`  mx-auto ${
                                isLoading
                                    ? "animate-pulse animate-spin text-primary"
                                    : null
                            }`}
                        />
                    </div>
                )}
                {fieldsArray.map(({ id, label, error, type, ...rest }) => (
                    <div className="mb-4" key={id}>
                        <label
                            htmlFor={id}
                            className="capitalize block text-gray-700 text-sm font-bold mb-2"
                        >
                            {label}
                        </label>
                        {type === "file" ? (
                            <div>
                                <div className="relative border border-gray-300 rounded-md mb-2">
                                    <input
                                        autocomplete="off"
                                        disabled={imageLoading || watch(id)}
                                        type={type}
                                        accept="image/*"
                                        onChange={e =>
                                            handleInputChange(e, id, type)
                                        }
                                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                        id={id}
                                        // {...register(id)}
                                        {...rest}
                                        multiple
                                        // value={selectedFile}
                                    />
                                    <div className="p-4">
                                        <p className="text-gray-500 text-xs">
                                            Select image(s)
                                        </p>
                                    </div>
                                </div>
                                <h2 className="flex text-primary text-xl">
                                    {imageLoading && `loading...`}
                                </h2>

                                {watch(id) && (
                                    <div
                                        className="relative
                                space-x-3 flex items-center mb-2"
                                    >
                                        <Trash
                                            onClick={() => setValue(id, "")}
                                            size={16}
                                            className="absolute text-primary cursor-pointer right-4"
                                        />
                                        <div className="relative h-14 w-14 flex items-center mb-2">
                                            <Image
                                                src={watch(id)}
                                                alt={"featured image"}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px" // Responsive sizes
                                                className="object-cover object-center rounded-md"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : id === "content" ? (
                            <RichTextEditor
                                setValue={setValue}
                                id={id}
                                watch={watch}
                            />
                        ) : id === "excerpt" || id === "comment" ? (
                            <textarea
                                autocomplete="off"
                                rows={10}
                                type={type}
                                onChange={e => handleInputChange(e, id, type)}
                                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={id}
                                {...register(id)}
                                {...rest}
                            />
                        ) : (
                            <div className="relative flex flex-row items-center">
                                <input
                                    type={type}
                                    autocomplete="off"
                                    onChange={e =>
                                        handleInputChange(e, id, type)
                                    }
                                    className=" appearance-none border rounded
                                w-full py-3 px-3 text-gray-700 leading-tight
                                focus:outline-none focus:shadow-outline"
                                    id={id}
                                    min={1}
                                    {...register(id)}
                                    {...rest}
                                />
                            </div>
                        )}
                        {errors[id]?.message && (
                            <p className="text-red-500 text-xs italic">
                                {!passwordMatch && id === "confirmpassword"
                                    ? "Passwords don't match"
                                    : errors[id].message}
                            </p>
                        )}
                    </div>
                ))}
                <div className="flex flex-row items-center justify-between">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className={` bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    >
                        {isLoading ? "loading..." : "Submit"}
                    </button>
                    <p
                        onClick={handleReset}
                        className="text-primary font-medium capitalize cursor-pointer"
                    >
                        reset
                    </p>
                </div>
            </form>
        </>
    );
};

export default Form;
