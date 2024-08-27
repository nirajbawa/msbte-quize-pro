"use client";
import { create } from "zustand";

const useResetPasswordStore = create((set) => ({
  token: "",
  setToken: (data: string) => {
    set({ token: data });
  },
}));

export default useResetPasswordStore;
