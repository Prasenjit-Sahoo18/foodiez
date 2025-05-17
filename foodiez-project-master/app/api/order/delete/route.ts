import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }

  const url = new URL(req.url);
  const itemId = url.searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json({
      message: "Invalid request",
    });
  }

  const menuItem = await prisma.menuItem.findUnique({
    where: {
      id: itemId,
    },
  });

  if (!menuItem) {
    return NextResponse.json({
      message: "Item not found",
    });
  }

  const orders = await prisma.order.findFirst({
    where: {
      userId: user.id as string,
      status: "pending",
    },
  });

  if (!orders) {
    return NextResponse.json({
      message: "Order not found",
    });
  }

  const existingItem = await prisma.orderItem.findFirst({
    where: {
      orderId: orders.id,
      menuItemId: menuItem.id,
    },
  });

  if (!existingItem) {
    return NextResponse.json({
      message: "Item not found in cart",
    });
  }

  await prisma.orderItem.delete({
    where: {
      id: existingItem.id,
    },
  });

  return NextResponse.json({
    message: "Item removed from cart",
  });
}