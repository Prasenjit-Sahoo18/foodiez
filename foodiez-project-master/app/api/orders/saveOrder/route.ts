import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;
  const { orderId, totalAmount } = await req.json();

  try {
    const order = await prisma.order.updateMany({
      where: {
        userId: user.id,
        status: "pending",
      },
      data: {
        orderId: orderId,
        totalAmount: totalAmount,
        status: "completed",
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ message: "Failed to save order" }, { status: 500 });
  }
}