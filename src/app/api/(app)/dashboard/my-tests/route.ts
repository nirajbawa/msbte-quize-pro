import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/Order";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXT_AUTH_SECRET,
    });
    const data = await OrderModel.find({
      userEmail: token?.email,
    })
      .populate({
        path: "testId",
        select: "-publish -createdAt -questionId",
      });

    if (data) {
      return Response.json(
        {
          success: true,
          message: "Test fetched successfully.",
          data,
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Error in fetching test.",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    
    return Response.json(
      {
        success: false,
        message: "Error in fetching test.",
      },
      { status: 500 }
    );
  }
}
