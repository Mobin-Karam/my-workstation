import { NextResponse } from "next/server";
import { createSessionId } from "@/lib/bale/context";

const TOKEN = process.env.BALE_BOT_TOKEN!;
const CHANNEL = process.env.BALE_CHANNEL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email = "", phone = "", message, donation = 0 } = body;

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: "Name and message required" },
        { status: 400 },
      );
    }

    const sessionId = createSessionId();

    const caption = `
📥 New Lead
🆔 ${sessionId}

👤 ${name}
📧 ${email || "-"}
📱 ${phone || "-"}
💬 ${message}
💰 ${donation || 0}
`;

    // send to Bale
    const res = await fetch(`https://tapi.bale.ai/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHANNEL,
        text: caption,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Bale API error" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
