"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import useLayoutStore from "@/store/useLayoutStore";
import TestToolBar from "@/components/TestToolBar";
import dayjs from "dayjs";
import TestQuestionSection from "@/components/TestQuestionSection";
import TestSolvedQuestionSection from "@/components/TestSolvedQuestionSection";
import useMcqStore from "@/store/useMcqStore";
import Loading from "@/assets/lottiefiles/loading.json";
import Lottiefiles from "@/components/Lottiefiles";
import { useQuery } from "@tanstack/react-query";
import { getUserTest } from "@/api-requests/TestRequests";
import { Skeleton } from "@/components/ui/skeleton";
import { createTimeModel, useTimeModel } from "react-compound-timer";
import { useRouter } from "next/navigation";

const stopwatch = createTimeModel({
  initialTime: 0,
  direction: "forward",
  startImmediately: false,
});

function BeginTest() {
  const searchParams = useSearchParams();

  const { isPending, isError, data } = useQuery({
    queryKey: ["beginTest"],
    queryFn: async () => await getUserTest(searchParams.get("id")),
  });

  const router = useRouter();

  const mcqStore = useMcqStore((state: any) => state.mcqQuestions);
  const loadMcqData = useMcqStore((state: any) => state.loadData);
  const index = useMcqStore((state: any) => state.index);
  const setIndex = useMcqStore((state: any) => state.setIndex);
  const mcqAnswers = useMcqStore((state: any) => state.mcqAnswers);
  const setReview = useMcqStore((state: any) => state.setReview);
  const setAnswer = useMcqStore((state: any) => state.setAnswer);
  const attempted = useMcqStore((state: any) => state.attempted);
  const attemptedAndReview = useMcqStore(
    (state: any) => state.attemptedAndReview
  );
  const notAttemptedAndReview = useMcqStore(
    (state: any) => state.notAttemptedAndReview
  );
  const setAttempted = useMcqStore((state: any) => state.setAttempted);
  const submitQuestions = useMcqStore((state: any) => state.submit);
  const submittedQuestions = useMcqStore(
    (state: any) => state.submittedQuestions
  );
  const setLayout = useLayoutStore((state: any) => state.setLayout);

  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    height: "200px",
    width: "200px",
  };

  const { value } = useTimeModel(stopwatch);

  const enterFullscreen = () => {
    const element = elementRef.current;
    if (element) {
      setFullScreen(true);
      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else if ((element as any).mozRequestFullScreen) {
        // Firefox
        (element as any).mozRequestFullScreen().catch((err: any) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else if ((element as any).webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        (element as any).webkitRequestFullscreen().catch((err: any) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else if ((element as any).msRequestFullscreen) {
        // IE/Edge
        (element as any).msRequestFullscreen().catch((err: any) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      }
    }
  };

  const exitFullscreen = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else if ((document as any).mozCancelFullScreen) {
      // Firefox
      (document as any).mozCancelFullScreen().catch((err: any) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else if ((document as any).webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      (document as any).webkitExitFullscreen().catch((err: any) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else if ((document as any).msExitFullscreen) {
      // IE/Edge
      (document as any).msExitFullscreen().catch((err: any) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message} (${err.name})`
        );
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        console.log("Exited fullscreen");
      } else {
        console.log("Entered fullscreen");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const screenModeSwitcher = () => {
    if (fullScreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const nextQuestion = () => {
    setAttempted();
    setIndex(index + 1);
  };

  const previousQuestion = () => {
    setAttempted();
    setIndex(index - 1);
  };

  const setQuestion = (index: number) => {
    setIndex(index);
  };

  const submit = () => {
    stopwatch.stop();
    submitQuestions(searchParams.get("id"), value);
  };

  useEffect(() => {
    if (submittedQuestions.length != 0) {
      router.replace(
        `/dashboard/my-tests/test/submit?id=${searchParams.get("id")}`
      );
      setLayout({
        isNavBarHidden: false,
        isFooterHidden: false,
      });
    }
  }, [submittedQuestions]);

  useEffect(() => {
    setLayout({
      isNavBarHidden: true,
      isFooterHidden: true,
    });
    enterFullscreen();
    loadMcqData(searchParams.get("id"));
  }, []);

  useEffect(() => {
    stopwatch.start();
  }, [mcqStore]);

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

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div ref={elementRef} style={{ width: "100%", height: "100%" }}>
      <TestToolBar
        title={
          isError || isPending ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            data?.data.title
          )
        }
        time={`${value.h} : ${value.m} : ${value.s}`}
        screenModeSwitcher={screenModeSwitcher}
      />
      <main className="bg-white w-full h-full xl:px-20 gap-12 text-gray-800 flex flex-col lg:flex-row">
        {mcqStore.length != 0 ? (
          <TestQuestionSection
            index={index}
            question={mcqStore[index].question}
            a={mcqStore[index].a}
            b={mcqStore[index].b}
            c={mcqStore[index].c}
            d={mcqStore[index].d}
            id={mcqStore[index].questionId}
            review={mcqAnswers[index].review}
            answer={mcqAnswers[index].answer}
            totalMcqQuestions={mcqStore.length}
            nextQuestion={nextQuestion}
            previousQuestion={previousQuestion}
            reviewQuestion={setReview}
            setAnswer={setAnswer}
            submit={submit}
          />
        ) : (
          <div className="w-[100%] min-h-screen p-10 flex justify-center items-center">
            <Lottiefiles
              loop={lottieProps.loop}
              autoplay={lottieProps.autoplay}
              animationData={lottieProps.animationData}
              height={lottieProps.height}
              width={lottieProps.width}
            />
          </div>
        )}

        <TestSolvedQuestionSection
          mcqAnswers={mcqAnswers}
          index={index}
          attempted={attempted}
          attemptedAndReview={attemptedAndReview}
          notAttemptedAndReview={notAttemptedAndReview}
          setQuestion={setQuestion}
        />
      </main>
    </div>
  );
}

export default BeginTest;
