import { NextResponse } from "next/server";
import { sendInvoice } from "@/lib/bale/payment";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, amount, sessionId } = body;

    if (!name || !email || !amount) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    if (amount < 10000) {
      return NextResponse.json(
        { success: false, error: "Min 10000" },
        { status: 400 }
      );
    }

    const payload = JSON.stringify({
      sessionId,
      email,
      type: "donation",
    });

    const invoice = await sendInvoice({
      title: "Donation",
      description: `Support from ${name}`,
      amount,
      payload,
    });

    return NextResponse.json({
      success: true,
      invoice,
      payload,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}