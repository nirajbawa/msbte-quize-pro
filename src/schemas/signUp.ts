import { z } from "zod";

const signUp = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must contain at least 2 characters" }),
    email: z.string().email({ message: "Please enter valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 character(s)" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // This specifies the path of the error
  });

export default signUp;
