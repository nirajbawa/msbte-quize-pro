import { z } from "zod";

const testSchema = z.object({
  title: z.string().min(2).nonempty(),
  price: z.string().min(1).nonempty(),
});

export const testEditSchema = z
  .object({
    title: z.string().min(2).max(50).nonempty(),
    price: z.string().min(1).nonempty(),
    publish: z.string().min(1),
  })
  .refine((data) => parseFloat(data.price) < 0, {
    message: "Passwords don't match",
    path: ["confirm"], // This specifies the path of the error
  });

export default testSchema;
