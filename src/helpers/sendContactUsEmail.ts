import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import contactEmail from "@/emails/contactEmail";

export async function sendContactUsEmail(
  email: string,
  fullName: string,
  subject: string,
  message: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_US_EMAIL || "",
      subject: "MSBTE Quiz - Contact Us Email",
      react: contactEmail({ email, fullName, subject, message }),
    });
    return { success: true, message: "contact us email send successfully" };
  } catch (emailError) {
    console.error("Error sending contact us email", emailError);
    return { success: false, message: "Failed to send contact us email" };
  }
}
