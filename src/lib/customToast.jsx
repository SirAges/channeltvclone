import toast from "react-hot-toast";
import Image from "next/image";

export const customToast = (res, type) => {
    toast.custom(t => (
        <div
            className={`${
                t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full white rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 z-50`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className=" relative pt-0.5 h-10 w-10 ">
                        <Image
                            className="object-contain rounded-full"
                            fill
                            src="/assets/images/tvlogo.png"
                            alt="channel logo"
                        />
                    </div>
                    <div className="ml-3 flex-1 px-2">
                        <p
                            className={`capitalize text-sm font-medium ${
                                type === "error"
                                    ? "text-danger"
                                    : type === "success"
                                    ? "text-success"
                                    : "text-warn"
                            }`}
                        >
                            {type}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{res}</p>
                    </div>
                </div>
            </div>
        </div>
    ));
};
