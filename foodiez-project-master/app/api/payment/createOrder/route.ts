import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// Validate environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay environment variables are not set");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const { amount, currency } = await req.json();
    if (typeof amount !== "number" || typeof currency !== "string") {
      return NextResponse.json(
        { error: "Invalid request body. 'amount' must be a number and 'currency' must be a string." },
        { status: 400 }
      );
    }

    // Create Razorpay order options
    const options = {
      amount: amount * 100, // amount in the smallest currency unit (e.g., paise for INR)
      currency: currency,
      receipt: `order_rcptid_${Date.now()}`, // Generate a unique receipt ID
      notes: {
        notes_key_1: "Tea, Earl Grey, Hot",
        notes_key_2: "Tea, Earl Grey… decaf.",
      },
    };

    console.log("Razorpay Order Options:", options); // Debugging log

    // Create the order using the Promise-based approach
    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", order);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error },
      { status: 500 }
    );
  }
}