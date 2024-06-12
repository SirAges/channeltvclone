import fs from "fs/promises";

export const GET = async () => {
    try {
        const data = await fs.readFile("token.json", "utf8");

        const { token } = JSON.parse(data);

        return new Response(token, { status: 200 });
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return new Response("Failed to fetch value", { status: 500 });
    }
};

export const POST = async request => {
    const value = await request.json();
    try {
        const jsonData = JSON.stringify({ token: value });
        await fs.writeFile("token.json", jsonData);
    
        return new Response("JSON file has been saved!", { status: 200 });
    } catch (error) {
    
        return new Response("Failed to create JSON file"+error.message, { status: 500 });
    }
};
