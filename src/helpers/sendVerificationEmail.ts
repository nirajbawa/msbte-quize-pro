import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import resetPasswordVerificationEmail from "@/emails/resetPasswordVerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    
    await resend.emails.send({
      from: "onboarding@msbtewallah.in",
      to: email,
      subject: "MSBTE Quiz Pro Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "verification email send successfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}

export async function sendResetPasswordVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "reset-password@msbtewallah.in",
      to: email,
      subject: "MSBTE Quiz Pro Verification Code",
      react: resetPasswordVerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "verification email send successfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
