"use client";
import StatsCard from "@/components/StatsCard";
import React, { useEffect, useMemo, useState } from "react";
import TestImg from "@/assets/images/man.png";
import Readable from "readable-numbers";
import { getDashboardStatistics } from "@/api-requests/StatisticsRequest";

interface Statistics {
  totalUsers: string;
  totalNoOfCourses: string;
  totalNoOfOrders: string;
}

const Hone = () => {
  const [data, setData] = useState<Statistics>({
    totalUsers: "0",
    totalNoOfCourses: "0",
    totalNoOfOrders: "0",
  });

  const fetchStatistics = async () => {
    try {
      const data = await getDashboardStatistics();

      const temp: Statistics = {
        totalUsers: Readable(data.data.totalUsers),
        totalNoOfCourses: Readable(data.data.totalNoOfCourses),
        totalNoOfOrders: Readable(data.data.totalNoOfOrders),
      };
      setData(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <main className="w-full homeLayout pt-28 gap-x-2 gap-y-10 text-gray-800 flex justify-between items-center flex-col md:flex-wrap md:flex-row px-60 ">
      <StatsCard img={TestImg} title="Users" stats={data.totalUsers} />
      <StatsCard img={TestImg} title="Courses" stats={data.totalNoOfCourses} />
      <StatsCard img={TestImg} title="Orders" stats={data.totalNoOfOrders} />
    </main>
  );
};

export default Hone;
