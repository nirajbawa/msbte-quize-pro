import { Button } from "@mui/material";
import React from "react";
import { Expand } from "lucide-react";

interface Args {
  title: string;
  time: string;
  screenModeSwitcher: () => void;
}

const TestToolBar = ({ title, time, screenModeSwitcher }: Args) => {
  return (
    <nav className="w-full h-16 bg-slate-300 flex flex-row items-center justify-between px-3 md:px-36 ">
      <h1 className="capitalize font-bold rowdies text-2xl p-5">{title}</h1>
      <div className="flex gap-5 items-center">
        <p>
          <span className="pr-3 font-bold"> Time : </span> {time}{" "}
        </p>

        <Button className="rounded-md px-5" onClick={screenModeSwitcher}>
          <Expand className="text-black" />
        </Button>
      </div>
    </nav>
  );
};

export default TestToolBar;
