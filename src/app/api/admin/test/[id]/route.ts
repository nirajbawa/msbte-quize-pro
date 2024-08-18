import dbConnect from "@/lib/dbConnect";
import TestModel from "@/models/Test";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { title, price, banner, publish } = await req.json();
    const testId = params.id;

    await TestModel.updateOne(
      { _id: testId },
      { title, price, banner, publish }
    );

    return Response.json(
      {
        success: true,
        message: "Test Updated successfully.",
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const testId = params.id;
    const data = await TestModel.findOne({ _id: testId });

    return Response.json(
      {
        success: true,
        message: "Test fetched successfully.",
        data,
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
