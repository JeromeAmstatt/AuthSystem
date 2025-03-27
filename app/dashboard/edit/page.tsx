"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Camera } from "lucide-react";

export default function ProfilePage() {
    const { data: session, update: updateSession } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        image: session?.user?.image || "",
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
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

            await updateSession({
                ...session,
                user: {
                    ...session?.user,
                    ...formData,
                },
            });

            toast({
                title: "Success",
                description: "Your profile has been updated successfully.",
            });

            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
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
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="relative inline-block">
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover mx-auto"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                        <User className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                                <label
                                    htmlFor="image-upload"
                                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <Camera className="w-4 h-4 text-gray-600" />
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                                }
                                placeholder="Enter your name"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={session?.user?.email || ""}
                                disabled
                                className="bg-gray-50"
                            />
                            <p className="text-sm text-gray-500">
                                Email cannot be changed
                            </p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Save Changes"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}