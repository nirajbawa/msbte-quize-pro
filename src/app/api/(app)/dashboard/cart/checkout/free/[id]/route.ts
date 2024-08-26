import OrderModel from "@/models/Order";
import TestModel from "@/models/Test";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

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
          message: "invalid test id.",
        },
        { status: 404 }
      );
    } else {
      if (parseFloat(testData.price) < 1) {
        const token = await getToken({
          req,
          secret: process.env.NEXT_AUTH_SECRET,
        });
        const order = new OrderModel({
          status: "captured",
          testId: testData._id,
          userEmail: token?.email,
          amount: testData.price,
          currency: "INR",
        });
        order.save();

        return Response.json(
          {
            success: true,
            message: "Test added to my tests successfully.",
          },
          { status: 200 }
        );
      } else {
        return Response.json(
          {
            success: false,
            message: "invalid test id.",
          },
          { status: 404 }
        );
      }
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
