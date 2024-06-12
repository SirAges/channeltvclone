/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#022d62",
                title: "#4d4d4d",
                excerpt: "#7a7a7a",
                body: "#272727",
                background: "#f8fbfe",
                error: "#ff0b0b",
                white2: "#f6f3f3",
                success: "#00ca03",
                warn: "#fdc305",
                card: "#d9e5f472",
                accent: "#cddcee",
                secondary: "#459b49"
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            }
        }
    },
    plugins: []
};
