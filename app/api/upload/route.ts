import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const { image } = await request.json();

        if (!image) {
            return new NextResponse("No image provided", { status: 400 });
        }

        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "profile_images",
        });

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error("Error uploading image:", error);
        return new NextResponse("Error uploading image", { status: 500 });
    }
}