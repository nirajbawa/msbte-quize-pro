import dbConnect from "@/lib/dbConnect";
import TestModel from "@/models/Test";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const testId = params.id;
    const data = await TestModel.findOne({ _id: testId, publish: true });

    if (!data) {
      return Response.json(
        {
          success: false,
          message: "Test not found.",
        },
        { status: 404 }
      );
    }

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
