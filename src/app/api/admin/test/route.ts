import dbConnect from "@/lib/dbConnect";
import TestModel from "@/models/Test";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { title, price, banner } = await req.json();

    const test = new TestModel({
      title,
      price,
      banner,
    });

    await test.save();

    return Response.json(
      {
        success: true,
        message: "Test created successfully.",
        data: { id: test._id },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error in registering test.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const data = await TestModel.find().sort({ updatedAt: 1 }).skip(skip).limit(limit);
    const totalRecords = await TestModel.countDocuments();

    return Response.json(
      {
        success: true,
        message: "Test fetched successfully.",
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
        message: "Error in fetching test.",
      },
      { status: 500 }
    );
  }
}
