import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/Order";
import TestModel from "@/models/Test";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const totalUsers = await UserModel.countDocuments({});
    const totalNoOfCourses = await TestModel.countDocuments({ publish: true });
    const totalNoOfOrders = await OrderModel.countDocuments({
      status: "captured",
    });

    return Response.json(
      {
        success: true,
        message: "Statistics fetched successfully.",
        data: {
          totalUsers,
          totalNoOfCourses,
          totalNoOfOrders,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error in fetching statistics.",
      },
      { status: 500 }
    );
  }
}
