import StatsCard from "@/components/StatsCard";
import React from "react";

const page = () => {
  return (
    <main className="w-full homeLayout pt-28 gap-x-2 gap-y-10 text-gray-800 flex justify-between items-center flex-col md:flex-wrap md:flex-row px-60 ">
      <StatsCard />
      <StatsCard />
      <StatsCard />
    </main>
  );
};

export default page;
