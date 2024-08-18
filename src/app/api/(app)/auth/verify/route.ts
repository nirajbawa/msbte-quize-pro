import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { code, email } = await request.json();
    const user = await UserModel.findOne({ email, isVerified: false });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User is not registered",
        },
        { status: 401 }
      );
    } else {
      if (user.verifyCode === code) {
        if (new Date(user.verifyCodeExpiry) > new Date()) {
          user.isVerified = true;
          await user.save();

          return Response.json(
            {
              success: false,
              message: "User verified successfully",
            },
            { status: 200 }
          );
        } else {
          return Response.json(
            {
              success: false,
              message: "Try Again to sign up your code will be expired",
            },
            { status: 401 }
          );
        }
      } else {
        return Response.json(
          {
            success: false,
            message: "Invalid verification code",
          },
          { status: 401 }
        );
      }
    }
  } catch (error) {
    console.error("Error in verifying user:", error);
    return Response.json(
      {
        success: false,
        message: "Error in verifying user",
      },
      { status: 500 }
    );
  }
}
