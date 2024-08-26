import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/Order";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;
    const data = await OrderModel.find().skip(skip).limit(limit);
    const totalRecords = await OrderModel.countDocuments();

    if (!data) {
      return Response.json(
        {
          success: false,
          message: "Orders not found.",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Orders fetched successfully.",
        data: {
          currentPage: page,
          totalPages: Math.ceil(totalRecords / limit),
          data,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error in fetching orders.",
      },
      { status: 500 }
    );
  }
}
