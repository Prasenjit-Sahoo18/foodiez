import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({
            message: "Unauthorized"
        })
    }
    console.log("Userid: ", session.user.id)

    const { name, guests, phone, date, time} = await req.json();

    console.log("Name: ", name)
    console.log("Guests: ", guests)
    console.log("Phone: ", phone)
    console.log("Date: ", date)
    console.log("Time: ", typeof(time))

    try{
        const table = await prisma.table.create({
            data: {
                userId: session.user.id,
                guests,
                name,
                phone,
                date,
                time
            }
        })
        return NextResponse.json(table)
    }catch(e){
        return NextResponse.json({ error: `Failed to book table, ${e}` }, { status: 500 });
    }
}


// get table booking data
export async function GET() {

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({
            message: "Unauthorized"
        })
    }

    if(session.user.email==="admin@gmail.com"){
        try{
            const bookings = await prisma.table.findMany({
                orderBy: {
                    createdAt: "desc"
                }
            })
            return NextResponse.json(bookings);
        }catch  {
            return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
        }
    }

    try {
      const bookings = await prisma.table.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            userId: session.user.id
        }
      })

      return NextResponse.json(bookings);

    } catch (error) {
      return NextResponse.json({ error: `Failed to fetch bookings. ${error}` }, { status: 500 });
    }
  }