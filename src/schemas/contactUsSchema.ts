import { z } from "zod";

export const contactUsSchema = z.object({
  email: z.string().email({ message: "please enter valid email" }),
  fullName: z
    .string()
    .min(8, { message: "Name must contain at least 5 character(s)" })
    .max(50, { message: "Name must not more than 50 character(s)" }),
  subject: z
    .string()
    .min(8, { message: "subject must contain at least 5 character(s)" })
    .max(500, { message: "Subject must not more than 50 character(s)" }),
  message: z
    .string()
    .min(8, { message: "Message must contain at least 10 character(s)" })
    .max(10000, { message: "Message must not more than 1000 character(s)" }),
});
