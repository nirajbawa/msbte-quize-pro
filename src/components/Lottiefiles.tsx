"use client";
import React from "react";
import Lottie from "react-lottie";

interface lottieProps {
  animationData: any;
  autoplay: boolean;
  loop: boolean;
  height: string | number;
  width: string | number;
}

const Lottiefiles = ({
  animationData,
  autoplay,
  loop,
  height,
  width,
}: lottieProps) => {
  const defaultOptions = {
    loop: loop,
    autoplay: autoplay,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      isClickToPauseDisabled={true}
      height={height}
      width={width}
    />
  );
};

export default Lottiefiles;
