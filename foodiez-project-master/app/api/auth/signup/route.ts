import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(6, "Password must have at least 6 characters"),
  username: z.string().min(1, "Name is required").max(100),
});

// Sign up endpoint
export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = userSchema.parse(body);

  try {
    if (!user || !user.email || !user.password || !user.username) {
      return NextResponse.json({
        message: "Invalid credentials",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        username: user.username,
      },
    });

    interface userData {
        name: string | null;
        id: string;
        image: string | null;
        email: string | null;
        username: string | null;
        createdAt: Date;
        updatedAt: Date;
        emailVerified: Date | null;
    }

    // Remove the password field using the delete operator
    const userWithoutPassword:userData = {
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        id: newUser.id,
        image: newUser.image,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        emailVerified: newUser.emailVerified
    }

    return NextResponse.json({
      user: userWithoutPassword,
      message: "User signed up successfully.",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}