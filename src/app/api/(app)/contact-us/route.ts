import { sendContactUsEmail } from "@/helpers/sendContactUsEmail";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, fullName, subject, message } = await req.json();
    const emailResponse = await sendContactUsEmail(
      email,
      fullName,
      subject,
      message
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
        message: emailResponse.message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in sending contact us message, please try again.",
      },
      { status: 500 }
    );
  }
}
