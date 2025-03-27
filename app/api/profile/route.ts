import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { name, image } = body;

        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                name,
                image,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}