import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/Order";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; email: string } }
) {
  await dbConnect();
  try {
    const testId = params.id;
    console.log(params.email);
    const data = await OrderModel.findOne({
      testId: testId,
      userEmail: params.email,
    });

    if (!data) {
      return Response.json(
        {
          success: false,
          message: "order not exits.",
        },
        { status: 404 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "order exits",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in fetching order.",
      },
      { status: 500 }
    );
  }
}
