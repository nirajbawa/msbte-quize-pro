import Image from "next/image";
import React from "react";

const StatsCard = ({
  img,
  stats,
  title,
}: {
  img: any;
  stats: string;
  title: string;
}) => {
  return (
    <div className="bg-white w-64 h-32 cardGlass p-5 flex flex-row gap-6 justify-center">
      <Image src={img} alt="img" className="w-20" />
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-xl">{stats}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
