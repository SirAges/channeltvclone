"use client";
import { Form } from "@/components";
import { useAxios } from "@/lib/useAxios";import { customToast } from
"../../../lib/customToast";
import CryptoJs from "crypto-js";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [verified, setVerified] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const fieldsArray = [
        {
            id: "otp",
            placeholder: "otp",
            name: "otp",
            label: "otp",
            error: "otp",
            type: "text",
            role: "otp"
        }
    ];
    const resetPasswordFieldsArray = [
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
            placeholder: "confirm password",
            name: "confirmpassword",
            label: "confirm password",
            error: "confirm password",
            type: "password",
            role: "confirmpassword"
        }
    ];

    const initialValues = {
        otp: ""
    };
    const resetPasswordInitialValues = {
        password: "",
        comfirmpassword: ""
    };

    const schema = z.object({
        otp: z.string({ message: "Must be a valid otp" })
    });
    const resetPasswordSchema = z.object({
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" }),
        confirmpassword: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
    });

    const onSubmit = async data => {
        try {
            setIsLoading(true);
            const decoded = jwtDecode(token);
            console.log("token", decoded);
            if (!decoded) {
                alert("token expired or invalid");
            }
            const { otp } = decoded;

            if (otp === data.otp) {
                setVerified(true);
            }
        } catch (error) {
            console.log("error", error);
            // throw new Error(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const onResetPasswordSubmit = async data => {
        const { password } = data;

        try {
            setIsLoading(true);
            const decoded = jwtDecode(token);
            console.log("token", decoded);
            if (!decoded) {
                alert("token expired or invalid");
                return;
            }
            const { id } = decoded;
            const encPassword = CryptoJs.AES.encrypt(
                password,
                process.env.NEXT_PUBLIC_CRYPTOJS_KEY
            ).toString();

            const res = await useAxios.patch(`/users/${id}`, {
                password: encPassword
            });
            console.log("res", res);
            if (res.status === 200) {
                const { data } = res;
                customToast(data, "success");
                router.replace(`/auth/login`);
            }
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
                    src="/assets/images/tv1.png"
                    alt="login"
                />
            </div>
            <div className="h-screen flex flex-col items-center justify-center   w-full md:w-1/2 px-3 py-5">
                <p className="uppercase font-medium text-white bg-primary rounded-full py-3 px-4 w-fit">
                    {verified ? "Password reset Form" : "verify email with otp"}
                </p>

                {!verified && (
                    <Form
                        from="otp"
                        fieldsArray={fieldsArray}
                        initialValues={initialValues}
                        schema={schema}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    />
                )}

                {verified && (
                    <Form
                        from="password"
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
export default RegisterPage;
