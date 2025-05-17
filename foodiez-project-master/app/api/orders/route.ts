import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


// Get all orders
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("No session found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  if (!user) {
    console.log("No user found in session");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if(user.email==="admin@gmail.com"){
    try {
      const orders = await prisma.order.findMany({
        where: { status: "completed" },
        orderBy: { createdAt: "desc" },
        include: { 
          user: true,
          items: { include: { menuItem: true } } },
      });
      return NextResponse.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: user.id },
      include: { items: { include: { menuItem: true } } },
    });
    console.log("Orders for user ID", user.id, ":", orders);
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// Place a new order
export async function POST(req: Request) {
  const { userId, items } = await req.json();

  if (!userId || !items || items.length === 0) {
    return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
  }

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        items: {
          create: items.map((item: { menuItemId: string; quantity: number }) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: { include: { menuItem: true } } },
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}