import React from "react";

interface QuestionAnswer {
  questionId: string;
  answer: string;
  review: boolean;
}

interface TestSolvedQuestionSectionProps {
  mcqAnswers: QuestionAnswer[];
  index: number;
  attempted: number;
  attemptedAndReview: number;
  notAttemptedAndReview: number;
  setQuestion: (index: number) => void;
}

function TestSolvedQuestionSection({
  mcqAnswers,
  index,
  attempted,
  attemptedAndReview,
  notAttemptedAndReview,
  setQuestion,
}: TestSolvedQuestionSectionProps) {
  return (
    <div className=" w-full justify-center gap-x-10 px-10 lg:w-[40%] min-h-screen p-5 flex flex-col sm:flex-row  lg:flex-col">
      <div className="w-full flex p-5 px-2 h-full lg:h-auto flex-wrap gap-1 justify-center bg-slate-100 rounded-xl">
        {mcqAnswers.map((value: QuestionAnswer, i: number) => (
          <div
            key={i}
            className={`${
              index == i
                ? "bg-red-500"
                : mcqAnswers[i].review === true
                ? mcqAnswers[i].answer !== ""
                  ? "bg-blue-500 hover:bg-slate-100"
                  : "bg-yellow-300 hover:bg-slate-100"
                : mcqAnswers[i].answer !== ""
                ? "bg-green-500 hover:bg-slate-100"
                : "bg-white hover:bg-slate-100"
            } w-10 h-10  border-2 duration-75 ease-linear  flex justify-center items-center cursor-pointer rounded-sm`}
            onClick={() => setQuestion(i)}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="w-full  bg-slate-100 mt-5 sm:mt-0 lg:mt-5 p-5 rounded-xl">
        <h1 className="text-center text-xl font-bold p-2">Overall Summary</h1>
        <div className="flex p-2 mt-2 flex-col gap-5">
          <div className="w-full flex justify-start items-center gap-3">
            <span className="bg-red-500 w-10 h-10 flex justify-center items-center text-white rounded-sm">
              {index + 1}
            </span>
            <p>Current Question</p>
          </div>
          <div className="w-full flex justify-start items-center gap-3 border-y-2 py-3">
            <p className="font-bold">Total Attempted : {attempted}</p>
          </div>
          <div className="w-full flex justify-start items-center gap-3">
            <span className="bg-green-500 w-10 h-10 flex justify-center items-center text-white rounded-sm">
              {attempted !== 0 ? attempted - 1 : attempted}
            </span>
            <p>Attempted</p>
          </div>
          <div className="w-full flex justify-start items-center gap-3">
            <span className="bg-blue-500 w-10 h-10 flex justify-center items-center text-white rounded-sm">
              {attemptedAndReview}
            </span>
            <p>Attempted and Review</p>
          </div>
          <div className="w-full flex justify-start items-center gap-3 border-y-2 py-3">
            <p className="font-bold">
              Total Not Attempted : {mcqAnswers.length - attempted}
            </p>
          </div>
          <div className="w-full flex justify-start items-center gap-3">
            <span className="bg-yellow-300 w-10 h-10 flex justify-center items-center text-white rounded-sm">
              {notAttemptedAndReview}
            </span>
            <p>Not Attempted and Review</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestSolvedQuestionSection;
