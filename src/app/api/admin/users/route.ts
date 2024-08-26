import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;
    const data = await UserModel.find().skip(skip).limit(limit);
    const totalRecords = await UserModel.countDocuments();

    if (!data) {
      return Response.json(
        {
          success: false,
          message: "Users not found.",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Users fetched successfully.",
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
        message: "Error in fetching Users.",
      },
      { status: 500 }
    );
  }
}
