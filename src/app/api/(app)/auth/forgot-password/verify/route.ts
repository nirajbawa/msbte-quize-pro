import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { code, email } = await req.json();
    const user = await UserModel.findOne({ email, isVerified: true });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User is not registered.",
        },
        { status: 401 }
      );
    } else {
      if (user.verifyCode === code) {
        if (new Date(user.verifyCodeExpiry) > new Date()) {
          const s = process.env.RESET_TOKEN_SECRET || "";
          let expiryDate = new Date();
          expiryDate.setMinutes(expiryDate.getMinutes() + 5);

          const user_token = jwt.sign(
            { email: user.email, expiry: expiryDate },
            s
          );

          return Response.json(
            {
              success: false,
              message: "User verified successfully.",
              data: { token: user_token },
            },
            { status: 200 }
          );
        } else {
          return Response.json(
            {
              success: false,
              message: "Try Again to sign up your code will be expired.",
            },
            { status: 401 }
          );
        }
      } else {
        return Response.json(
          {
            success: false,
            message: "Invalid verification code.",
          },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error in verifying user.",
      },
      { status: 500 }
    );
  }
}
