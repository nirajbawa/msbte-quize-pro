import dbConnect from "@/lib/dbConnect";
import QuestionModel from "@/models/Question";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const testId = params.id;
    const data = await QuestionModel.findOne(
      {
        testId: testId,
      },
      { "publicQuestions.answer": 0, savedQuestions: 0 }
    );

    if (!data) {
      return Response.json(
        {
          success: false,
          message: "Test questions not found.",
        },
        { status: 404 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Test questions fetched successfully.",
          data,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in fetching test questions.",
      },
      { status: 500 }
    );
  }
}
