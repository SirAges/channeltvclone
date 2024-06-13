"use client";
import { Form } from "@/components";
import { useAxios } from "@/lib/useAxios";
import { writejson } from "@/lib/utils";
import { customToast } from "@/lib/customToast";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");
    const fieldsArray = [
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
        }
    ];
    const resetPasswordFieldsArray = [
        {
            id: "email",
            placeholder: "email",
            name: "email",
            label: "email",
            error: "email",
            type: "email",
            role: "email"
        }
    ];

    const initialValues = {
        email: "",
        password: ""
    };
    const resetPasswordInitialValues = {
        email: ""
    };

    const schema = z.object({
        email: z.string().email({ message: "Must be a valid email" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
    });
    const resetPasswordSchema = z.object({
        email: z.string().email({ message: "Must be a valid email" })
    });
    const custoast = (res, type) => {};

    const onSubmit = async data => {
        try {
            setIsLoading(true);
            const res = await useAxios.post("/auth/login", data);
            console.log("res", res);
            if (res.status === 200) {
              sessionStorage.setItem("token",res.data)
              
            // await useAxios.post("/json",res.data)
                customToast("successfully logged in", "success");
                router.replace(origin ? origin : "/");
            }
        } catch (error) {
            console.log("error", error);
            customToast(error.response.data, "error");
        } finally {
            setIsLoading(false);
        }
    };
    const onResetPasswordSubmit = async data => {
        const { email } = data;

        try {
            setIsLoading(true);

            const res = await useAxios.post("/auth/resetpassword", {
                email
            });
            if (res.status === 200) {
                const { data } = res;
                customToast("OTP sent to email", "success");
                router.push(`/auth/resetpassword?token=${data}`);
            }
            console.log("res", res);
        } catch (error) {
            console.log("error", error);
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
                    src="/assets/images/tv2.jpg"
                    alt="login"
                />
            </div>
            <div className="h-screen flex flex-col items-center justify-center   w-full md:w-1/2 px-3 py-5">
                <p className="capitalize font-medium text-white bg-primary rounded-full py-3 px-4 w-fit">
                    Login Form
                </p>
                <div className="flex flex-col items-center">
                    <span className="flex flex-row items-center w-full space-x-3 justify-center mt-4">
                        <p className="text-title">No account</p>
                        <Link
                            href="/auth/register"
                            className="capitalize text-primary font-medium"
                        >
                            Signup
                        </Link>
                    </span>
                    {resetPassword ? (
                        <h3
                            onClick={() => setResetPassword(false)}
                            className="capitalize text-primary text-sm mt-5 cursor-pointer"
                        >
                            cancel
                        </h3>
                    ) : (
                        <h3
                            onClick={() => setResetPassword(true)}
                            className="capitalize text-primary text-sm mt-5 cursor-pointer"
                        >
                            Forgot Password
                        </h3>
                    )}
                </div>
                {!resetPassword && (
                    <Form
                        from="login"
                        fieldsArray={fieldsArray}
                        initialValues={initialValues}
                        schema={schema}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    />
                )}

                {resetPassword && (
                    <Form
                        from="login"
                        fieldsArray={resetPasswordFieldsArray}
                        initialValues={resetPasswordInitialValues}
                        schema={resetPasswordSchema}
                        onSubmit={onResetPasswordSubmit}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
};
export default LoginPage;
