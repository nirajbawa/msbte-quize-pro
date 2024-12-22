import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { sendResetPasswordVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  await dbConnect();
  try {
    const email = params.email;
    const existingVerifiedEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    let expiryDate;

    if (!existingVerifiedEmail) {
      return Response.json(
        {
          success: false,
          message: "Email is not registered",
        },
        { status: 404 }
      );
    } else {
      expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 3);
      await UserModel.updateOne(
        { email },
        {
          verifyCode,
          verifyCodeExpiry: expiryDate,
        }
      );

      const emailResponse = await sendResetPasswordVerificationEmail(
        email,
        existingVerifiedEmail.username,
        verifyCode
      );

      if (!emailResponse.success) {
        return Response.json(
          {
            success: false,
            message: emailResponse.message,
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          success: true,
          message:
            "Verification email send successfully. Please verify your email.",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error in fetching user.",
      },
      { status: 500 }
    );
  }
}
