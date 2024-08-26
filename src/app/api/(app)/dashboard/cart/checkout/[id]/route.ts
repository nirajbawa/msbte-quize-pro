import TestModel from "@/models/Test";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const RAZORPAY_API_KEY = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_APT_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_APT_SECRET,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testData = await TestModel.findOne({ _id: params.id });

    if (!testData) {
      return Response.json(
        {
          success: false,
          message: "Error in creating order invalid test id.",
        },
        { status: 404 }
      );
    } else {
      const token = await getToken({
        req,
        secret: process.env.NEXT_AUTH_SECRET,
      });

      const payment_capture = 1;
      const amount = parseFloat(testData.price) * 100;
      const currency = "INR";
      const options: any = {
        amount: amount.toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
          userEmail: token?.email,
          productId: testData._id,
          title: testData.title,
        },
      };

      const order = await instance.orders.create(options);
      return NextResponse.json({ message: true, data: order });
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in creating order.",
      },
      { status: 500 }
    );
  }
}
