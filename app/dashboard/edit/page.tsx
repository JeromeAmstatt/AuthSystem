"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Camera } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
    // Get session and update function from NextAuth
    const { data: session, update: updateSession } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form data state
    const [formData, setFormData] = useState({
        name: "",
        image: "",
    });

    // Update form data when session changes
    useEffect(() => {
        if (session?.user) {
            setFormData({
                name: session.user.name || "",
                image: session.user.image || "",
            });
        }
    }, [session]);

    // Handle image upload and conversion to base64
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        try {
            // Convert file to base64
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            // Upload to Cloudinary through our API
            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image: base64 }),
            });

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload image");
            }

            const { url } = await uploadResponse.json();

            // Update form data with new image URL
            setFormData(prev => ({ ...prev, image: url }));

            toast({
                title: "Success",
                description: "Image uploaded successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to upload image. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        

        try {
            // Update user data in the database
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedUser = await response.json();
            

            toast({
                title: "Success",
                description: "Profile updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
        router.refresh()
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md mx-auto p-6 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Update your profile information
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            {formData.image ? (
                                <Image
                                    src={formData.image}
                                    alt="Profile"
                                    className="h-24 w-24 rounded-full object-cover"
                                    width={50}
                                    height={50}
                                />
                            ) : (
                                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="h-12 w-12 text-gray-400" />
                                </div>
                            )}
                            <label
                                htmlFor="image-upload"
                                className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50"
                            >
                                <Camera className="h-4 w-4 text-gray-600" />
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={isLoading}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Email Display (Read-only) */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={session?.user?.email || ""}
                            disabled
                            className="bg-gray-50"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}