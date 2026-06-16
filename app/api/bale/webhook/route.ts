import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const update = await req.json();

    // -------------------------
    // PRE CHECKOUT
    // -------------------------
    if (update.pre_checkout_query) {
      const q = update.pre_checkout_query;

      await fetch(
        `https://tapi.bale.ai/bot${process.env.BALE_BOT_TOKEN}/answerPreCheckoutQuery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pre_checkout_query_id: q.id,
            ok: true,
          }),
        }
      );

      return NextResponse.json({ ok: true });
    }

    // -------------------------
    // PAYMENT SUCCESS
    // -------------------------
    if (update.successful_payment) {
      const payment = update.successful_payment;

      const payload = JSON.parse(payment.invoice_payload);
      const sessionId = payload.sessionId;

      console.log("PAYMENT OK:", sessionId);

      await fetch(
        `https://tapi.bale.ai/bot${process.env.BALE_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.BALE_CHANNEL,
            text: `✅ Payment received\n🆔 ${sessionId}\n💰 ${payment.total_amount}`,
          }),
        }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}