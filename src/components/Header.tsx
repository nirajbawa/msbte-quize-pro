import React from "react";
import Lottiefiles from "./Lottiefiles";
import HeaderAnimation from "@/assets/lottiefiles/header-animation.json";
import { Button } from "./ui/button";
import Link from "next/link";

const header = () => {
  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: HeaderAnimation,
    height: "auto",
    width: "auto",
  };
  return (
    <header className="w-full max-h-full homeLayout pt-24 flex flex-wrap text-gray-800 sm:flex-row sm:justify-between">
      <div className="w-full sm:w-[40%] ">
        <h1 className="text-3xl font-extrabold rowdies mt-5 mb-2 sm:mt-20 sm:mb-5 xl:text-5xl xl:mt-40">
          MSBTEQuiz<sup className="text-blue-500 -z-50 ">Pro</sup>
        </h1>
        <h6 className="font-bold mb-5 text-xl sm:mb-10">
          Master the Art of Exam Success
        </h6>
        <p>
          Transforming Learning into Achievement Your One-Stop Solution for
          MSBTE Exam Preparation
        </p>
        <div className="my-10">
          <Link href="/tests">
            <Button>{"Get started, it's free"}</Button>
          </Link>
        </div>
      </div>
      <div className="w-full sm:w-[50%]">
        <Lottiefiles
          loop={lottieProps.loop}
          autoplay={lottieProps.autoplay}
          animationData={lottieProps.animationData}
          height={lottieProps.height}
          width={lottieProps.width}
        />
      </div>
    </header>
  );
};

export default header;
