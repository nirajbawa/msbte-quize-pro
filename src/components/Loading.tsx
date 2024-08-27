import React from "react";
import Lottiefiles from "./Lottiefiles";

function Loading({ animation }:any) {
  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: animation,
    height: "auto",
    width: "auto",
  };
  return (
    <div className="w-[20%]">
      <Lottiefiles
        loop={lottieProps.loop}
        autoplay={lottieProps.autoplay}
        animationData={lottieProps.animationData}
        height={lottieProps.height}
        width={lottieProps.width}
      />
    </div>
  );
}

export default Loading;
