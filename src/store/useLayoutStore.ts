"use client";
import create from "zustand";

interface Layout {
  isNavBarHidden: boolean;
  isFooterHidden: boolean;
}

const useLayoutStore = create((set) => ({
  layout: {
    isNavBarHidden: false,
    isFooterHidden: false,
  },
  setLayout: (data: Layout) => {
    set({ layout: data });
  },
}));

export default useLayoutStore;
