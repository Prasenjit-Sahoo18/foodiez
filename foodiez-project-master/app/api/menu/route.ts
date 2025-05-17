import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


// Get all menu items
export async function GET(req: NextRequest) {

  try {
    const typeName = req.nextUrl.searchParams.get("typeName");

    if (!typeName || typeName == null) {
      const menuItems = await prisma.menuItem.findMany();
      return NextResponse.json({
        menuItems
      })
    }
    else {
      const menuItems = await prisma.menuItem.findMany({
        where: { typeName }
      });
      return NextResponse.json(menuItems);
    }
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch menu items. ${error}` }, { status: 500 });
  }
}

// Add a new menu item
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if(!session || session.user.email!=="admin@gmail.com"){
    return NextResponse.json({
      message: "Unauthorized."
    })
  }

  const { name, description, price, imageUrl, typeName } = await req.json();

  try {
    const newItem = await prisma.menuItem.create({
      data: { name, description, price, imageUrl, typeName },
    });
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: `Failed to add menu item. ${error}` }, { status: 500 });
  }
}


// Delete an existing item
export async function DELETE(req:NextRequest){
  const session = await getServerSession(authOptions);

  if(!session || session.user.email!=="admin@gmail.com"){
    return NextResponse.json({
      message: "Unauthorized."
    })
  }

  const { id } = await req.json();

  try {
    const newItem = await prisma.menuItem.delete({
      where: {
        id
      }
    });
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete menu item. ${error}` }, { status: 500 });
  }
}


// update an existing item

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if(!session || session.user.email!=="admin@gmail.com"){
    return NextResponse.json({
      message: "Unauthorized."
    })
  }

  interface updateItemData {
    name?: string,
    description?: string,
    price?: number,
    imageUrl?: string,
    typeName?: string,
  }

  const { id, name, description, price, imageUrl, typeName } = await req.json();

  const updateData:updateItemData = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (price !== undefined) updateData.price = price;
  if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
  if (typeName !== undefined) updateData.typeName = typeName;

  try {
    const updatedItem = await prisma.menuItem.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return NextResponse.json(updatedItem);
  } catch (e) {
    return NextResponse.json({ error: `Failed to update menu item. ${e}` }, { status: 500 });
  }
}
