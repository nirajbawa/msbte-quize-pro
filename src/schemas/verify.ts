import { z } from "zod";

const verifySchema = z.object({
  email: z.string().email({ message: "Please enter valid email" }),
  code: z.string().length(6, { message: "Invalid code" }),
});

export default verifySchema;
