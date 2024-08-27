import { Button } from "@mui/material";
import React from "react";
import { Expand } from "lucide-react";

interface Args {
  title: string;
  time: string;
}

const TestToolBar = ({ title, time }: Args) => {
  return (
    <nav className="w-full  bg-slate-300 flex py-5 gap-y-5 md:gap-x-20 justify-start md:flex-row flex-col items-start md:items-center md:justify-between px-3 md:px-36 ">
      <h1 className="capitalize font-bold rowdies xl:text-xl ">{title}</h1>
      <div className="flex gap-5 items-center">
        <p>
          <span className="pr-3 font-bold"> Time : </span> {time}{" "}
        </p>
      </div>
    </nav>
  );
};

export default TestToolBar;
