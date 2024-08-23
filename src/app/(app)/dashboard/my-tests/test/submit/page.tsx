"use client";
import useMcqStore from "@/store/useMcqStore";
import { useRouter } from "next/navigation";
import React, { ReactNode, useMemo, useState } from "react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

ChartJS.register(ArcElement, Tooltip);

function Submit() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [questionsMetaData, setQuestionsMetaData] = useState<{
    totalNoOfQuestions: number;
    totalNoOfUnsolvedQuestions: number;
    totalNoOfSolvedQuestions: number;
    totalNoOfCorrectAnswer: number;
    totalNoOfUnCorrectAnswer: number;
    totalTakeToSolve: ReactNode;
  }>({
    totalNoOfQuestions: 0,
    totalNoOfUnsolvedQuestions: 0,
    totalNoOfSolvedQuestions: 0,
    totalNoOfCorrectAnswer: 0,
    totalNoOfUnCorrectAnswer: 0,
    totalTakeToSolve: <></>,
  });
  const [data, setData] = useState<Array<any>>([]);

  const submittedQuestions = useMcqStore(
    (state: any) => state.submittedQuestions
  );

  const timeToSolve = useMcqStore((state: any) => state.timeToSolve);

  const makeSubmitEmpty = useMcqStore((state: any) => state.makeSubmitEmpty);

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  const options: any = {
    plugins: {
      responsive: true,
      legend: {
        position: "top" as const,
      },
      tooltip: {
        // Custom tooltip position
        position: "nearest",
      },
    },
    cutout: data.map((item: any) => item.cutout),
  };

  useEffect(() => {
    // Function to handle the beforeunload event
    const handleBeforeUnload = (event: any) => {
      // Custom message (some browsers may ignore this)
      const message =
        "Are you sure you want to leave? Changes you made may not be saved.";

      event.preventDefault(); // Some browsers require calling preventDefault
      event.returnValue = message; // Standard way to show the message

      return message; // Some browsers require returning the message
    };

    // Add the event listener when the component is mounted
    window.addEventListener("beforeunload", handleBeforeUnload);

    // if (submittedQuestions.length == 0) {
    //   router.back();
    // }
    const totalNoOfQuestions = submittedQuestions.length;
    let totalNoOfUnsolvedQuestions = 0;
    let totalNoOfSolvedQuestions = 0;
    let totalNoOfCorrectAnswer = 0;
    let totalNoOfUnCorrectAnswer = 0;
    let totalTakeToSolve = 0;
    let unit = "";
    if (timeToSolve.h != 0) {
      unit = "Hr";
      totalTakeToSolve =
        timeToSolve.h + timeToSolve.m / 60 + timeToSolve.s / 3600;
    } else if (timeToSolve.m != 0) {
      unit = "Min";
      totalTakeToSolve =
        timeToSolve.h * 60 + timeToSolve.m + timeToSolve.s / 60;
    } else {
      unit = "Sec";
      totalTakeToSolve =
        timeToSolve.h * 3600 + timeToSolve.m * 60 + timeToSolve.s;
    }

    submittedQuestions.forEach((item: any) => {
      if (item?.selectedAnswer) {
        totalNoOfUnsolvedQuestions++;
      } else {
        totalNoOfSolvedQuestions++;
      }

      if (item.isAnswerCorrect) {
        totalNoOfCorrectAnswer++;
      } else {
        totalNoOfUnCorrectAnswer++;
      }
    });

    const time = (
      <>
        {`Solved in`}
        <br />
        {`${totalTakeToSolve} ${unit}`}
      </>
    );

    setQuestionsMetaData({
      totalNoOfQuestions: totalNoOfQuestions,
      totalNoOfUnsolvedQuestions: totalNoOfUnsolvedQuestions,
      totalNoOfSolvedQuestions: totalNoOfSolvedQuestions,
      totalNoOfCorrectAnswer: totalNoOfCorrectAnswer,
      totalNoOfUnCorrectAnswer: totalNoOfUnCorrectAnswer,
      totalTakeToSolve: time,
    });

    setData([
      {
        label: "Total No Of Questions",
        value: totalNoOfQuestions,
        color: "rgba(0, 43, 73, 1)",
        cutout: "50%",
      },
      {
        label: "Total No Of Solved Questions",
        value: totalNoOfSolvedQuestions,
        color: "rgba(83, 217, 217, 1)",
        cutout: "50%",
      },
      {
        label: "Total No Of Unsolved Questions",
        value: totalNoOfUnsolvedQuestions,
        color: "rgb(255, 205, 86)",
        cutout: "50%",
      },
      {
        label: "Total No Of Correct Answers",
        value: totalNoOfCorrectAnswer,
        color: "rgb(54, 162, 235)",
        cutout: "50%",
      },
      {
        label: "Total No Of Incorrect Answers",
        value: totalNoOfUnCorrectAnswer,
        color: "rgb(255, 99, 132)",
        cutout: "50%",
      },
    ]);

    setQuestions(submittedQuestions);
    // makeSubmitEmpty();

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <main className="bg-white w-full min-h-screen h-full pt-28 px-10 lg:px-40 xl:px-56 gap-12 text-gray-800 flex justify-start flex-col">
      <div className="w-full flex bg-slate-100 flex-col p-2 md:p-5 py-10 gap-5 rounded-xl justify-center">
        {questions.length != 0 ? (
          <p className="w-full text-3xl font-bold text-center mb-5 mt-10">
            Test Statistics
          </p>
        ) : (
          ""
        )}
        {questions.length != 0 ? (
          <div className="w-full h-96 rounded-md p-5 flex justify-center items-center flex-col gap-y-8">
            <Doughnut data={finalData} options={options} />
          </div>
        ) : (
          ""
        )}
        {questions.length != 0 ? (
          <div className="w-full flex flex-row flex-wrap justify-center items-center md:py-10 gap-5">
            <div className="h-28 font-bold py-10 w-36 bg-white shadow-md rounded-xl flex justify-center items-center text-center">
              Total Score
              <br />
              {questionsMetaData.totalNoOfCorrectAnswer} /{" "}
              {questionsMetaData.totalNoOfQuestions}
            </div>
            <div className="h-28 font-bold  py-10 w-36 bg-white shadow-md rounded-xl flex justify-center items-center text-center">
              {questionsMetaData.totalTakeToSolve}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="w-full flex flex-col gap-10">
        {questions.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="w-full min-h-52 h-full bg-slate-100 rounded-xl p-10 flex flex-col gap-y-8"
            >
              <p className="font-bold">Question {index + 1} : </p>
              <p>{item.question}</p>
              <div className="w-full flex flex-col gap-8">
                <div className="flex gap-10 h-full flex-col md:flex-row">
                  <p
                    className={`${
                      item.answer == item.a
                        ? "bg-green-400"
                        : item?.selectedAnswer == item.a
                        ? "bg-red-400"
                        : ""
                    } flex w-full md:w-[60%] min-h-fit cursor-pointer border-2 p-2 rounded-sm`}
                  >
                    {item.a}
                  </p>
                  <p
                    className={`${
                      item.answer == item.b
                        ? "bg-green-400"
                        : item?.selectedAnswer == item.b
                        ? "bg-red-400"
                        : ""
                    } flex w-full md:w-[60%] min-h-fit cursor-pointer border-2 p-2 rounded-sm`}
                  >
                    {item.b}
                  </p>
                </div>
                <div className="flex gap-10 h-full flex-col md:flex-row">
                  <p
                    className={`${
                      item.answer == item.c
                        ? "bg-green-400"
                        : item?.selectedAnswer == item.c
                        ? "bg-red-400"
                        : ""
                    } flex w-full md:w-[60%] min-h-fit cursor-pointer border-2 p-2 rounded-sm`}
                  >
                    {item.c}
                  </p>
                  <p
                    className={`${
                      item.answer == item.d
                        ? "bg-green-400"
                        : item?.selectedAnswer == item.d
                        ? "bg-red-400"
                        : ""
                    } fle w-full md:w-[60%] min-h-fit cursor-pointer border-2 p-2 rounded-sm`}
                  >
                    {item.d}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center">
        <Link href={"/"}>
          <Button variant="destructive" onClick={() => setLoader(!loader)}>
            {loader ? (
              <Loader2 className="h-4 mx-3 w-4 animate-spin" />
            ) : (
              "Home"
            )}
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default Submit;
