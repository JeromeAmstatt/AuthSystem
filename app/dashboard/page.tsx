"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserRoundPen } from "lucide-react"


export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 pt-16">
            <div className="container min-h-screen mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-100 p-2 rounded-full">
                                <Image 
                                    src={session?.user?.image || "/images/pp.webp"} 
                                    className="rounded-full" 
                                    alt="User Image"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <Link href={"/dashboard/edit"}>
                                    <UserRoundPen />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome, {session?.user?.name || "User"}!
                                </h1>
                                <p className="text-gray-500">{session?.user?.email}</p>
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                        <Link href={'/'}>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            Accueil
                        </Button>
                        </Link>
                        
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-indigo-900 mb-2">
                            Account Information
                        </h2>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>
                                <span className="font-medium">Name:</span>{" "}
                                {session?.user?.name || "Not provided"}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span>{" "}
                                {session?.user?.email || "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}