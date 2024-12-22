import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import OrderModel from "@/models/Order";

const RAZORPAY_API_KEY = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_APT_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_APT_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const razorpay_signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEB_HOOK_KEY_SECRET || "")
      .update(JSON.stringify(body))
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      const paymentDetails = await instance.payments.fetch(body.payload.payment.entity.id);

      const amount = (paymentDetails.amount as number) / 100;

      const order = new OrderModel({
        razorpay_order_id: paymentDetails.order_id,
        razorpay_payment_id: paymentDetails.id,
        status: paymentDetails.status,
        method: paymentDetails.method,
        testId: paymentDetails.notes.productId,
        userEmail: paymentDetails.notes.userEmail,
        amount: amount,
        currency: paymentDetails.currency,
      });

      await order.save();

      return NextResponse.json({
        success: true,
        message: "Order verified successfully.",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Error in verifying order.",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    
    return Response.json(
      {
        success: false,
        message: "Error in verifying order.",
      },
      { status: 500 }
    );
  }
}