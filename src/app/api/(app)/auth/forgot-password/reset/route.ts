import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { token, password } = await req.json();
    const s = process.env.RESET_TOKEN_SECRET || "";
    const decodedToken = jwt.verify(token, s) as {
      email: string;
      expiry: string;
      iat: number;
    };

    if (!decodedToken) {
      return Response.json(
        {
          success: false,
          message: "Invalid token.",
        },
        { status: 500 }
      );
    } else {
  
      if (new Date(decodedToken.expiry) > new Date()) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.updateOne(
          { email: decodedToken.email },
          { password: hashedPassword }
        );

        return Response.json(
          {
            success: true,
            message: "Password reset successfully.",
          },
          { status: 200 }
        );
      } else {
        return Response.json(
          {
            success: false,
            message: "Try Again to forgot password your token will be expired.",
          },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.log("Error in reset password : ", error);
    return Response.json(
      {
        success: false,
        message: "Error in reset password.",
      },
      { status: 500 }
    );
  }
}
