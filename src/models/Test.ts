import mongoose, { Schema, Document } from "mongoose";

export interface Test extends Document {
  title: string;
  price: string;
  banner: string;
  questionId: Schema.Types.ObjectId;
  publish: boolean;
}

// Updated User schema
const TestSchema: Schema<Test> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    banner: {
      type: String,
      required: [true, "Banner is required"],
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "question",
      default: null,
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const TestModel =
  (mongoose.models.tests as mongoose.Model<Test>) ||
  mongoose.model<Test>("tests", TestSchema);

export default TestModel;
