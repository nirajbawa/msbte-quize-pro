import Image from "next/image";
import React from "react";
import TestImg from "@/assets/images/man.png";

const StatsCard = () => {
  return (
    <div className="bg-white w-64 h-32 cardGlass p-5 flex flex-row gap-6 justify-center">
      <Image src={TestImg} alt="img" className="w-20" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-xl">20K+</h2>
        <p>Users</p>
      </div>
    </div>
  );
};

export default StatsCard;
