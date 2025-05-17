import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const response = await prisma.type.findMany();

    return NextResponse.json({
        response
    })
}