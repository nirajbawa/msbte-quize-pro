import { z } from "zod";

export const restPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter valid email" }),
});
