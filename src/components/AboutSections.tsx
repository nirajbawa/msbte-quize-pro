import React from "react";
import Lottiefiles from "./Lottiefiles";

interface Settings {
  flex: string;
  animation: any;
  bgColor: string;
}

interface AboutSectionProps {
  settings: Settings;
  title1: string;
  title2: string;
  content1: any;
  content2: any;
}

const AboutSections = ({
  settings,
  title1,
  title2,
  content1,
  content2,
}: AboutSectionProps) => {
  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: settings.animation,
    height: "auto",
    width: "auto",
  };

  return (
    <main
      className={`w-full min-h-screen max-h-full homeLayout flex flex-wrap flex-col-reverse text-gray-800 sm:${settings.flex} sm:justify-between py-16 sm:py-20 sm:pb-32 ${settings.bgColor}`}
    >
      <div className="w-full sm:w-[40%] mt-14 flex flex-col justify-between gap-y-10 ">
        <h1 className="text-3xl font-extrabold rowdies">{title1}</h1>
        <div className="flex  flex-col">{content1}</div>
        <h1 className="text-3xl font-extrabold rowdies">{title2}</h1>
        <div className="flex flex-col">{content2}</div>
      </div>
      <div className="w-full sm:w-[50%] flex justify-center">
        <Lottiefiles
          loop={lottieProps.loop}
          autoplay={lottieProps.autoplay}
          animationData={lottieProps.animationData}
          height={lottieProps.height}
          width={lottieProps.width}
        />
      </div>
    </main>
  );
};

export default AboutSections;
