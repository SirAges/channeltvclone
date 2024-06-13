import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "ChannelsTv",
    description: "Your news source",icons: {
        icon: "/assets/images/tvlogo.png"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Toaster />
                {children}
            </body>
        </html>
    );
}
