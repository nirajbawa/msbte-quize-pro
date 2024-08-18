import { z } from "zod";

const uploadImageSchema = z.object({
  image: z.instanceof(FileList),
});

export default uploadImageSchema;
