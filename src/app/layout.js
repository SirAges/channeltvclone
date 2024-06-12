import { Toaster } from "react-hot-toast";


export const metadata = {
    title: "ChannelsTv",
    description: "Your news source"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Toaster />
                {children}
            </body>
        </html>
    );
}
