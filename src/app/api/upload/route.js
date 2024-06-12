import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_API_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});

export async function POST(request) {
    const { path } = await request.json();
    if (!path) {
        return new Response("Image path is required", { status: 400 });
    }

    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            timeout: 15000,
            transformation: [
                { width: 800, height: 600, crop: "fill" }, // Resize to fit 800x600 pixels and crop any excess
                { quality: "auto" } // Automatically adjust image quality
                // Add more transformations as needed
            ]
        };

        const result = await cloudinary.uploader.upload(path, options);
        return new Response(result.secure_url, { status: 200 });
    } catch (error) {
      console.log('error', error)
        return new Response("Failed to upload file on Cloudinary" + error, {
            status: 500
        });
    }
}
