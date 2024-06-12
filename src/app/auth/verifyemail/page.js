"use client";
import { useAxios } from "@/lib/useAxios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { customToast } from "../../../lib/customToast";
const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            console.log("token", token);
            const decoded = jwtDecode(token);
          
    
            const res = await useAxios.post("/auth/register", decoded);

            if (res.status === 200) {
                customToast(res.data, "success");
                router.replace(`${process.env.NEXT_PUBLIC_DOMAIN}/auth/login`);
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
                    src="/assets/images/tv3.jpg"
                    alt="login"
                />
            </div>
            <div className="h-screen flex flex-col items-center justify-center   w-full md:w-1/2 px-3 py-5">
                <h1
                    disabled={isLoading}
                    onClick={onSubmit}
                    className={`${
                        isLoading && "animate-pulse"
                    } uppercase font-medium text-white bg-primary rounded-full py-3 px-4 w-1/2 text-center text-2xl cursor-pointer`}
                >
                    Verify
                </h1>
            </div>
        </div>
    );
};
export default RegisterPage;
