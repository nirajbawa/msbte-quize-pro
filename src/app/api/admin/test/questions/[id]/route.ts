import dbConnect from "@/lib/dbConnect";
import QuestionModel from "@/models/Question";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import TestModel from "@/models/Test";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const questions = await req.json();
    const testId = params.id;

    const isQuestionsAlreadyExists = await QuestionModel.findOne({ testId });

    if (!isQuestionsAlreadyExists) {
      const objId = new mongoose.Types.ObjectId(testId);
      const newQuestions = new QuestionModel({
        testId: objId,
        publicQuestions: questions,
        savedQuestions: questions,
      });

      await newQuestions.save();

      await TestModel.updateOne(
        { _id: testId },
        { questionId: newQuestions._id }
      );
    } else {
      await QuestionModel.updateOne(
        { testId },
        { publicQuestions: questions, savedQuestions: questions }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Question published successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    
    return Response.json(
      {
        success: false,
        message: "Error in publishing questions.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const questions = await req.json();
    const testId = params.id;

    const isQuestionsAlreadyExists = await QuestionModel.findOne({ testId });

    if (!isQuestionsAlreadyExists) {
      const objId = new mongoose.Types.ObjectId(testId);
      const newQuestions = new QuestionModel({
        testId: objId,
        publicQuestions: questions,
        savedQuestions: questions,
      });

      await newQuestions.save();

      await TestModel.updateOne(
        { _id: testId },
        { questionId: newQuestions._id }
      );
    } else {
      await QuestionModel.updateOne({ testId }, { savedQuestions: questions });
    }

    return Response.json(
      {
        success: true,
        message: "Question saved successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    
    return Response.json(
      {
        success: false,
        message: "Error in publishing questions.",
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

    const data = await QuestionModel.findOne({ testId });

    return Response.json(
      {
        success: true,
        message: "Questions fetched successfully.",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    
    return Response.json(
      {
        success: false,
        message: "Error in fetching questions.",
      },
      { status: 500 }
    );
  }
}
