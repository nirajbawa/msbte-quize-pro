"use client";
import { create } from 'zustand';
import { getQuestion } from "@/api-requests/TestQuestionsRequest";
import { submitQuestions } from "@/api-requests/TestQuestionsRequest";

interface mcqQuestion {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  questionId: string;
}

interface QuestionAnswer {
  questionId: string;
  answer: string;
  review: boolean;
}

const useMcqStore = create((set: any, get: any) => ({
  mcqQuestions: [],
  index: 0,
  mcqAnswers: [],
  attempted: 0,
  attemptedAndReview: 0,
  notAttemptedAndReview: 0,
  submittedQuestions: [],
  timeToSolve: {},
  setIndex: (index: number) => {
    if (index < get().mcqQuestions.length && index >= 0) {
      set({ index: index });
    }
  },
  setReview: (index: number, state: boolean) => {
    let attemptedAndReview = 0;
    let notAttemptedAndReview = 0;
    const temp = get().mcqAnswers.map((item: QuestionAnswer, i: number) => {
      if (item.answer === "" && item.review === true) {
        notAttemptedAndReview++;
      } else if (item.review === true) {
        attemptedAndReview++;
      }
      if (index === i) {
        return {
          questionId: item.questionId,
          answer: item.answer,
          review: state,
        };
      } else {
        return {
          questionId: item.questionId,
          answer: item.answer,
          review: item.review,
        };
      }
    });

    set({ attemptedAndReview: attemptedAndReview });
    set({ notAttemptedAndReview: notAttemptedAndReview });
    set({ mcqAnswers: temp });
  },
  setAnswer: (index: number, answer: string) => {
    let attempted = 0;
    let attemptedAndReview = 0;
    let notAttemptedAndReview = 0;

    const temp = get().mcqAnswers.map((item: QuestionAnswer, i: number) => {
      if (item.answer === "" && item.review === true) {
        notAttemptedAndReview++;
      } else if (item.review === true) {
        attemptedAndReview++;
      }
      if (index === i) {
        if (answer !== "") {
          attempted++;
        }
        return {
          questionId: item.questionId,
          answer: answer,
          review: item.review,
        };
      } else {
        if (item.answer !== "") {
          attempted++;
        }
        return {
          questionId: item.questionId,
          answer: item.answer,
          review: item.review,
        };
      }
    });
    set({ attempted: attempted });
    set({ attemptedAndReview: attemptedAndReview });
    set({ notAttemptedAndReview: notAttemptedAndReview });

    set({ mcqAnswers: temp });
  },
  setAttempted: async () => {
    let attempted = 0;
    let attemptedAndReview = 0;
    let notAttemptedAndReview = 0;
    await get().mcqAnswers.forEach((item: QuestionAnswer) => {
      if (item.answer !== "") {
        attempted++;
      }
      if (item.answer === "" && item.review === true) {
        notAttemptedAndReview++;
      } else if (item.review === true) {
        attemptedAndReview++;
      }
    });
    set({ attempted: attempted });
    set({ attemptedAndReview: attemptedAndReview });
    set({ notAttemptedAndReview: notAttemptedAndReview });
  },
  loadData: async (id: string) => {
    try {
      const d = await getQuestion(id);
      set({ mcqQuestions: d.data.publicQuestions });
      const questions = d.data.publicQuestions;
      const temp = questions.map((value: mcqQuestion, index: number) => {
        return {
          questionId: value.questionId,
          answer: "",
          review: false,
        } as QuestionAnswer;
      });
      set({ mcqAnswers: temp });
    } catch {}
  },
  submit: async (id: string, timeToSolve: string) => {
    const data = await get().mcqAnswers;
    const res = await submitQuestions(id, {
      answers: data,
      timeToSolve: timeToSolve,
    });
    set({ submittedQuestions: res.data.solvedQuestions });
    set({
      timeToSolve: {
        h: res.data.timeToSolve.h,
        m: res.data.timeToSolve.m,
        s: res.data.timeToSolve.s,
      },
    });
  },
  makeSubmitEmpty: () => {
    set({ submittedQuestions: [] });
  },
}));

export default useMcqStore;
