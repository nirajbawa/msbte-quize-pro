import mongoose, { Schema, Document } from "mongoose";

export interface mcqQuestion {
  questionId: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: string;
}

export interface Question extends Document {
  testId: Schema.Types.ObjectId;
  publicQuestions: mcqQuestion[];
  savedQuestions: mcqQuestion[];
}

const QuestionSchema: Schema<Question> = new mongoose.Schema(
  {
    testId: {
      type: Schema.Types.ObjectId,
      ref: "tests",
      required: [true, "testId is required"],
    },
    publicQuestions: {
      type: [],
      required: [true, "Public questions is required"],
    },
    savedQuestions: {
      type: [],
      required: [true, "Saved questions is required"],
    },
  },
  { timestamps: true }
);

const QuestionModel =
  (mongoose.models.questions as mongoose.Model<Question>) ||
  mongoose.model<Question>("questions", QuestionSchema);

export default QuestionModel;
