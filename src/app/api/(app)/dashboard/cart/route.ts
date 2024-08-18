import dbConnect from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { testId } = await req.json();

    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    const isAlreadyExists = await CartModel.findOne({
      testId: testId,
      userId: token?._id,
      payment: false,
    });

    if (!isAlreadyExists) {
      const entry = new CartModel({
        testId: testId,
        userId: token?._id,
        payment: false,
      });

      await entry.save();
    } else {
      throw Error("item Already exists in cart");
    }

    return Response.json(
      {
        success: true,
        message: "Item added to cart successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in adding item.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    const data = await CartModel.find({
      userId: token?._id,
      payment: false,
    }).populate("testId", {
      publish: 0,
      createdAt: 0,
      questionId: 0,
    });

    return Response.json(
      {
        success: true,
        message: "cart data fetch successfully.",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in fetching cart data.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const { testId } = await req.json();
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    const isDelete = await CartModel.deleteOne({
      userId: token?._id,
      testId: testId,
    });

    if (isDelete.deletedCount > 0) {
      return Response.json(
        {
          success: true,
          message: "Item removed from cart successfully.",
        },
        { status: 200 }
      );
    } else {
      throw Error("item not exists in cart");
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in remove item from cart.",
      },
      { status: 500 }
    );
  }
}
