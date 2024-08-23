import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface QuestionsProp {
  index: number;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  id: string;
  review: boolean;
  answer: string;
  totalMcqQuestions: number;
  nextQuestion: () => void;
  previousQuestion: () => void;
  reviewQuestion: (index: number, state: boolean) => void;
  setAnswer: (index: number, answer: string) => void;
  submit: () => void;
}

function TestQuestionSection({
  index,
  question,
  a,
  b,
  c,
  d,
  id,
  review,
  answer,
  totalMcqQuestions,
  nextQuestion,
  previousQuestion,
  reviewQuestion,
  setAnswer,
  submit,
}: QuestionsProp) {
  const inputDiv1 = useRef<HTMLInputElement>(null);
  const inputDiv2 = useRef<HTMLInputElement>(null);
  const inputDiv3 = useRef<HTMLInputElement>(null);
  const inputDiv4 = useRef<HTMLInputElement>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const saveAnswer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnswer(index, e.currentTarget.innerText);
  };

  const saveAnswerOnDub = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnswer(index, "");
  };

  return (
    <div className="w-[100%] min-h-screen p-10">
      <div className="w-full flex flex-col gap-5 pt-16">
        <h1 className="font-bold">Question {index + 1} : </h1>
        <p className="min-h-44">{question}</p>
        <div className="flex w-full flex-col gap-8 h-full">
          <div className="flex w-full gap-5 h-full">
            <div
              ref={inputDiv1}
              onClick={saveAnswer}
              onDoubleClick={saveAnswerOnDub}
              className={`${
                inputDiv1.current?.innerText === answer
                  ? "bg-green-400"
                  : "hover:bg-slate-100"
              } flex w-[60%] min-h-fit ease-linear duration-75  cursor-pointer border-2 p-2 rounded-sm`}
            >
              {a}
            </div>
            <div
              ref={inputDiv2}
              onClick={saveAnswer}
              onDoubleClick={saveAnswerOnDub}
              className={`${
                inputDiv2.current?.innerText === answer
                  ? "bg-green-400"
                  : "hover:bg-slate-100"
              } flex w-[60%] min-h-fit ease-linear duration-75  cursor-pointer border-2 p-2 rounded-sm`}
            >
              {b}
            </div>
          </div>
          <div className="flex w-full gap-5 h-full">
            <div
              ref={inputDiv3}
              onClick={saveAnswer}
              onDoubleClick={saveAnswerOnDub}
              className={`${
                inputDiv3.current?.innerText === answer
                  ? "bg-green-400"
                  : "hover:bg-slate-100"
              } flex w-[60%] min-h-fit ease-linear duration-75  cursor-pointer border-2 p-2 rounded-sm`}
            >
              {c}
            </div>
            <div
              ref={inputDiv4}
              onClick={saveAnswer}
              onDoubleClick={saveAnswerOnDub}
              className={`${
                inputDiv4.current?.innerText === answer
                  ? "bg-green-400"
                  : "hover:bg-slate-100"
              } flex w-[60%] min-h-fit ease-linear duration-75  cursor-pointer border-2 p-2 rounded-sm`}
            >
              {d}
            </div>
          </div>
        </div>
        <div className="w-full flex gap-5 mt-10 flex-col sm:flex-row">
          <div className=" flex gap-5 ">
            <Button onClick={previousQuestion}>Previous</Button>
            <Button onClick={nextQuestion}>Save And Next</Button>
          </div>

          <div className="sm:ml-5 flex w-full items-center align-middle gap-x-5">
            <Input
              type="checkbox"
              className="w-5 h-5"
              checked={review}
              onChange={(event) => reviewQuestion(index, event.target.checked)}
            />
            To be Reviewed Later
          </div>
          {index === totalMcqQuestions - 1 ? (
            <Button
              variant="destructive"
              onClick={() => {
                submit();
                setLoader(!loader);
              }}
            >
              {loader ? (
                <Loader2 className="h-4 mx-6 w-4 animate-spin" />
              ) : (
                " End Exam"
              )}
            </Button>
          ) : (
            ""
          )}
        </div>
        <p className="text-red-400">
          End Exam Button Available on Last Question
        </p>
      </div>
    </div>
  );
}

export default TestQuestionSection;
