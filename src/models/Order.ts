import mongoose, { Schema, Document } from "mongoose";

export interface Order extends Document {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  status: string;
  method?: string;
  testId: Schema.Types.ObjectId;
  userEmail: string;
  amount: number;
  currency: string;
}

const OrderSchema: Schema<Order> = new mongoose.Schema(
  {
    razorpay_order_id: {
      type: Schema.Types.String,
      required: [false, "razorpay order id is required"],
    },
    razorpay_payment_id: {
      type: Schema.Types.String,
      required: [false, "razorpay payment id is required"],
    },
    status: {
      type: Schema.Types.String,
      required: [true, "status is required"],
    },
    method: {
      type: Schema.Types.String,
      required: [false, "method is required"],
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: "tests",
      required: [true, "test id is required"],
    },
    userEmail: {
      type: Schema.Types.String,
      required: [true, "user email is required"],
    },
    amount: {
      type: Schema.Types.Number,
      required: [true, "status is required"],
    },
    currency: {
      type: Schema.Types.String,
      required: [true, "currency is required"],
    },
  },
  { timestamps: true }
);

const OrderModel =
  (mongoose.models.orders as mongoose.Model<Order>) ||
  mongoose.model<Order>("orders", OrderSchema);

export default OrderModel;
