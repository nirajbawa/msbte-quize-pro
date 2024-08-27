"use client";
import { z } from "zod";

const uploadImageSchema = z.object({
  image: z.any(),
});

export default uploadImageSchema;
