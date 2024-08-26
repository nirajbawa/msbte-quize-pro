"use client";
import React from "react";
import ExamAnimation from "@/assets/lottiefiles/exam.json";
import Lottiefiles from "./Lottiefiles";
import TestCard from "./TestCard";
import { Button } from "./ui/button";
import TestImg from "@/assets/images/testImg.webp";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useQuery } from "@tanstack/react-query";

const Tests = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const response = await axios.get<ApiResponse>(
        `/api/test?page=${1}&limit=1`
      );
      return response.data;
    },
    staleTime: 10000,
  });

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: ExamAnimation,
    height: "auto",
    width: "auto",
  };
  return (
    <main className="bg-gray-100 w-full min-h-screen max-h-full homeLayout flex flex-wrap text-gray-800 sm:flex-row sm:justify-between sm:pt-20 xl:pt-5">
      <div className="w-full sm:w-[40%] mt-14">
        <h1 className="text-3xl font-extrabold capitalize rowdies text-center mb-10 md:mb-0">
          Explore our quiz tests
        </h1>
        <div className="flex md:py-10 xl:p-10 flex-col">
          {isPending || isError || data.data.totalPages === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="space-y-3">
                  <Skeleton className="h-4 md:w-[350px]" />
                  <Skeleton className="h-4 md:w-[200px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="cursor-pointer w-full">
                <Skeleton className="h-[200px] md:w-[350px] rounded-xl" />
                <div className="pt-7 flex justify-center w-full">
                  <Skeleton className="h-4 w-[70px]" />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between w-full">
                <div className="flex justify-center w-full">
                  <Skeleton className="h-4 w-[30px]" />
                </div>
              </CardFooter>
            </Card>
          ) : (
            data &&
            data.data.data.map((item: any, index: number) => (
              <TestCard
                key={index}
                title={item.title}
                img={item.banner}
                price={item.price}
                btnUrl={`/cart/checkout?id=${item._id}`}
              />
            ))
          )}

          <div className="flex justify-center p-10">
            <Link href="/tests">
              <Button size="default" variant="outline">
                Show More
              </Button>
            </Link>
          </div>
        </div>
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

export default Tests;
