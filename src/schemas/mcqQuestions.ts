import { z } from "zod";
const mcqQuestions = z.object({
  questions: z.array(
    z.object({
      question: z.string().nonempty("Question is required").nonempty(),
      a: z.string().nonempty("Option A is required").nonempty(),
      b: z.string().nonempty("Option B is required").nonempty(),
      c: z.string().nonempty("Option C is required").nonempty(),
      d: z.string().nonempty("Option D is required").nonempty(),
      answer: z.string().nonempty("Answer is required").nonempty(),
      questionId: z.string().nonempty("question id is required").nonempty(),
    })
  ),
});
export default mcqQuestions;
