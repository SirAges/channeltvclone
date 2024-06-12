"use client";
import { Form } from "@/components";
import { useAxios } from "@/lib/useAxios";
import { customToast } from "../../../lib/customToast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import * as z from "zod";

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const fieldsArray = [
        {
            id: "firstName",
            placeholder: "first name",
            name: "firstName",
            label: "first name",
            error: "firstName",
            type: "text",
            role: "firstName"
        },
        {
            id: "lastName",
            placeholder: "last name",
            name: "lastName",
            label: "last name",
            error: "lastName",
            type: "text",
            role: "lastName"
        },
        {
            id: "email",
            placeholder: "email",
            name: "email",
            label: "email",
            error: "email",
            type: "email",
            role: "email"
        },
        {
            id: "password",
            placeholder: "password",
            name: "password",
            label: "password",
            error: "password",
            type: "password",
            role: "password"
        },
        {
            id: "confirmpassword",
            placeholder: "confirmpassword",
            name: "confirmpassword",
            label: "confirm password",
            error: "confirmpassword",
            type: "password",
            role: "confirmpassword"
        }
    ];

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: ""
    };

    const schema = z.object({
        lastName: z.string().min(2, {
            message: "Last name must be at least 2 characters long"
        }),
        firstName: z.string().min(2, {
            message: "First name must be at least 2 characters long"
        }),
        email: z.string().email({ message: "Must be a valid email" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" }),
        confirmpassword: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
    });
    const onSubmit = async data => {
        const { email, password, firstName, lastName } = data;

        try {
            setIsLoading(true);

            const res = await useAxios.post("/auth/verifyemail", {
                lastName,
                firstName,
                password,
                email
            });
            if (res.status === 200) {
                customToast(res.data, "success");
                router.push("/");
            }
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
            // throw new Error(error.message);
            customToast(error.response.data, "error");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex flex-col h-screen bg-foreground md:flex-row">
            <div className="relative w-full md:w-1/2 h-full">
                <Image
                    className="object-cover "
                    fill
                    priority
                    src="/assets/images/tv3.jpg"
                    alt="login"
                />
            </div>
            <div className="h-screen flex flex-col items-center justify-center   w-full md:w-1/2 px-3 py-5">
                <p className="capitalize font-medium text-white bg-primary rounded-full py-3 px-4 w-fit">
                    SignUp Form
                </p>
                <span className="flex items-center justify-center w-full space-x-3 mt-4">
                    <p className="text-title">I have an account</p>
                    <Link
                        href="/auth/login"
                        className="capitalize text-primary font-medium"
                    >
                        Login
                    </Link>
                </span>
                <Form
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    from="register"
                    fieldsArray={fieldsArray}
                    initialValues={initialValues}
                    schema={schema}
                />
            </div>
        </div>
    );
};
export default RegisterPage;
