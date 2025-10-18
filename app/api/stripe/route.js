import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // --- 1. Read the raw body correctly ---
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    // --- 2. Construct and verify event ---
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // FIX: not process.nextTick
    );

    // --- 3. Function to handle success/failure ---
    const handlePaymentIntent = async (paymentIntentId, isPaid) => {
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1,
      });

      const session = sessions.data[0];
      if (!session?.metadata) return;

      const { orderIds, userId, appId } = session.metadata;

      if (appId !== "dreamsaver") {
        console.warn("Invalid appId:", appId);
        return;
      }

      const orderIdsArray = orderIds.split(",");

      if (isPaid) {
        // ✅ Mark orders as paid
        await Promise.all(
          orderIdsArray.map((orderId) =>
            prisma.order.update({
              where: { id: orderId },
              data: { isPaid: true },
            })
          )
        );

        // ✅ Empty user's cart
        await prisma.user.update({
          where: { id: userId },
          data: { cart: {} },
        });
      } else {
        // ❌ Delete unpaid orders
        await Promise.all(
          orderIdsArray.map((orderId) =>
            prisma.order.delete({
              where: { id: orderId },
            })
          )
        );
      }
    };

    // --- 4. Handle event types ---
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntent(event.data.object.id, true);
        break;

      case "payment_intent.canceled":
      case "payment_intent.payment_failed":
        await handlePaymentIntent(event.data.object.id, false);
        break;

      default:
        console.log("Unhandled event type:", event.type);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// --- 5. Disable body parsing (required for raw text) ---
export const config = {
  api: {
    bodyParser: false,
  },
};
