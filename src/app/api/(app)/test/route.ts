import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/models/Order";
import TestModel from "@/models/Test";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    if (!token) {
      const data = await TestModel.find(
        { publish: true },
        {
          title: 1,
          price: 1,
          banner: 1,
          updatedAt: 1,
        }
      )
        .skip(skip)
        .limit(limit);
      const totalRecords = await TestModel.countDocuments({ publish: true });

      return Response.json(
        {
          success: true,
          message: "Test fetched successfully.",
          data: {
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
            data,
          },
        },
        { status: 200 }
      );
    } else {
      const cartData = await OrderModel.find(
        {
          userEmail: token.email,
        },
        {
          testId: 1,
        }
      );

      let skipData = cartData.map((item: any) => {
        return item.testId.toString();
      });

      const data = await TestModel.find(
        { publish: true, _id: { $nin: skipData } },
        {
          title: 1,
          price: 1,
          banner: 1,
          updatedAt: 1,
        }
      )
        .skip(skip)
        .limit(limit);
      const totalRecords = await TestModel.countDocuments({
        publish: true,
        _id: { $nin: skipData },
      });

      return Response.json(
        {
          success: true,
          message: "Test fetched successfully.",
          data: {
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit),
            data,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in fetching test.",
      },
      { status: 500 }
    );
  }
}
