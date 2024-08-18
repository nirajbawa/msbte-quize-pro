import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "please enter valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});

export default signInSchema;
