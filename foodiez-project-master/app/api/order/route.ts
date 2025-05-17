import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, itemId }: { userId: string; itemId: string } = await req.json();

  if (!userId || !itemId) {
    return NextResponse.json({
      message: "Invalid request",
    });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }

  const user = session.user;

  const orders = await prisma.order.findFirst({
    where: {
      userId: user.id as string,
      status: "pending"
    },
    include: {
      items: true,
    },
  });

  if (!orders) {
    await prisma.order.create({
      data: {
        userId: user.id,
        items: {
          create: [
            {
              menuItemId: itemId,
              quantity: 1,
            },
          ],
        },
      },
    });
  } else {
    const existingItem = orders.items.find(item => item.menuItemId === itemId);

    if (!existingItem) {
      await prisma.order.update({
        where: {
          id: orders.id,
        },
        data: {
          items: {
            create: [
              {
                menuItemId: itemId,
                quantity: 1,
              },
            ],
          },
        },
      });
    } else {
      await prisma.orderItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    }
  }

  return NextResponse.json({
    message: "Item added to cart",
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  console.log("User: ", user)

  if (!session || !user) {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }

  const url = new URL(req.url);
  const itemId = url.searchParams.get("itemId");

  console.log("Item Id: ", itemId);

  if (!itemId) {
    return NextResponse.json({
      message: "Invalid request",
    });
  }

  const orders = await prisma.order.findFirst({
    where: {
      userId: user.id as string,
      status: "pending"
    },
    include: {
      items: true,
    },
  });

  console.log("Orders: ", orders);

  if (!orders) {
    return NextResponse.json({
      message: "Order not found",
    });
  }

  const existingItem = orders.items.find(item => item.menuItemId === itemId);

  if (!existingItem) {
    return NextResponse.json({
      message: "Item not found in cart",
    });
  }

  if (existingItem.quantity === 1) {
    await prisma.orderItem.delete({
      where: {
        id: existingItem.id,
      },
    });
  } else {
    await prisma.orderItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  }

  return NextResponse.json({
    message: "Item removed from cart",
  });
}