import dbConnect from "@/lib/dbConnect";
import QuestionModel, { mcqQuestion } from "@/models/Question";
import { NextRequest } from "next/server";
import { it } from "node:test";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const testId = params.id;
    const { answers } = await req.json();

    const testQuestions = await QuestionModel.findOne(
      { testId: testId },
      {
        publicQuestions: 1,
      }
    );

    if (!testQuestions) {
      return Response.json(
        {
          success: false,
          message: "Test not found.",
          data: testQuestions,
        },
        { status: 404 }
      );
    } else {
      console.log(testQuestions.publicQuestions);
      const solvedQuestions = testQuestions.publicQuestions.map(
        (item: mcqQuestion, index: number) => {
          if (item.answer == answers[index].answer) {
            return {
              questionId: item.questionId,
              question: item.question,
              a: item.a,
              b: item.b,
              c: item.c,
              d: item.d,
              answer: item.answer,
              isAnswerCorrect: true,
            };
          } else {
            return {
              questionId: item.questionId,
              question: item.question,
              a: item.a,
              b: item.b,
              c: item.c,
              d: item.d,
              answer: item.answer,
              selectedAnswer: answers[index].answer,
              isAnswerCorrect: false,
            };
          }
        }
      );

      return Response.json(
        {
          success: true,
          message: "Test submitted successfully.",
          data: solvedQuestions,
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
