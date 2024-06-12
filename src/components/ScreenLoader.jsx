import Image from "next/image";
const ScreenLoader = () => {
    return (
        <div className="flex min-h-screen bg-card items-center justify-center">
            <div className="animate-pulse relative  h-14 w-14">
                <Image
                    priority
                    className="object-cover"
                    src="/assets/images/tvlogo.png"
                    alt="logo"
                    fill
                />
            </div>
        </div>
    );
};
export default ScreenLoader;
