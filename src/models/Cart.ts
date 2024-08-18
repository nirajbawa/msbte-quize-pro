import mongoose, { Schema, Document } from "mongoose";

export interface Cart extends Document {
  testId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  payment: boolean;
}

const CartSchema: Schema<Cart> = new mongoose.Schema(
  {
    testId: {
      type: Schema.Types.ObjectId,
      ref: "tests",
      required: [true, "testId is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
    },
    payment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CartModel =
  (mongoose.models.carts as mongoose.Model<Cart>) ||
  mongoose.model<Cart>("carts", CartSchema);

export default CartModel;
