import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingVerifiedEmail = await UserModel.findOne({
      email,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    let hashedPassword, expiryDate;

    if (!existingVerifiedEmail) {
      hashedPassword = await bcrypt.hash(password, 10);
      expiryDate = new Date();
      expiryDate.setHours(expiryDate.getMinutes() + 5);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
      });

      await newUser.save();
    } else if (existingVerifiedEmail?.isVerified) {
      return Response.json(
        {
          success: false,
          message: "Email is already registered",
        },
        { status: 400 }
      );
    } else {
      expiryDate = new Date();
      expiryDate.setHours(expiryDate.getMinutes() + 5);
      await UserModel.updateOne(
        { email },
        { username, verifyCode, verifyCodeExpiry: expiryDate }
      );
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
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
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error in registering user.",
      },
      { status: 500 }
    );
  }
}
