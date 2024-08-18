import { z } from "zod";

const testSchema = z.object({
  title: z.string().min(2).nonempty(),
  price: z.string().min(1).nonempty(),
});

export const testEditSchema = z.object({
  title: z.string().min(2).max(30).nonempty(),
  price: z.string().min(1).nonempty(),
  publish: z.string().min(1),
});

export default testSchema;
