"use client";
import { create } from 'zustand';
import { getQuestion } from "@/api-requests/QuestionsRequest";

interface mcqQuestion {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: string;
  questionId: string;
}

const useMcqEditStore = create((set, get) => ({
  mcqEditForm: [],
  removeEditFormData: (data: mcqQuestion) => {
    set({ mcqEditForm: data });
  },
  loadData: async (id: string) => {
    try {
      const d = await getQuestion(id);
      set({ mcqEditForm: d.data.savedQuestions });
    } catch {}
  },
}));

export default useMcqEditStore;
