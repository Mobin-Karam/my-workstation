import { NextResponse } from "next/server";

const TOKEN = process.env.BALE_BOT_TOKEN!;
const CHANNEL = process.env.BALE_CHANNEL!;

export async function POST(req: Request) {
  try {
    const update = await req.json();

    /* ---------------- PRE CHECKOUT ---------------- */
    if (update.pre_checkout_query) {
      const q = update.pre_checkout_query;

      await fetch(`https://tapi.bale.ai/bot${TOKEN}/answerPreCheckoutQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pre_checkout_query_id: q.id,
          ok: true,
        }),
      });

      return NextResponse.json({ ok: true });
    }

    /* ---------------- PAYMENT SUCCESS ---------------- */
    if (update.successful_payment) {
      const payment = update.successful_payment;

      const payload = JSON.parse(payment.invoice_payload);
      const sessionId = payload.sessionId;

      // ✅ 1. LOG PAYMENT
      console.log("PAYMENT SUCCESS:", sessionId);

      // ❗ 2. HERE YOU WOULD UPDATE DB (IMPORTANT)
      // await db.session.update({ sessionId, paid: true })

      // 3. NOTIFY ADMIN
      await fetch(`https://tapi.bale.ai/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHANNEL,
          text:
            `✅ Payment Successful\n` +
            `🆔 ${sessionId}\n` +
            `💰 ${payment.total_amount} IRR\n` +
            `📦 Donation confirmed`,
        }),
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Webhook error" },
      { status: 500 },
    );
  }
}
