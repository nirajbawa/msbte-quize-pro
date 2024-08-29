"use client";
import { getMyTests } from "@/api-requests/MyTests";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ErrorAnimations from "@/assets/lottiefiles/error-not-fetch.json";
import Lottiefiles from "@/components/Lottiefiles";
import MyTestCard from "@/components/MyTestCard";

function MyTests() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["test"],
    queryFn: async () => await getMyTests(),
  });

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: ErrorAnimations,
    height: "auto",
    width: "auto",
  };

  return (
    <main className="w-full min-h-screen homeLayout px-2 sm:px-10 md:px-40 pt-28  gap-12 text-gray-800 flex justify-between flex-col md:flex-wrap md:flex-row">
      <div className="blurCss w-full min-h-screen rounded-xl flex flex-col">
        <h1 className="rowdies text-center md:text-left py-6 px-10 border-gray-100 border-b-2 font-bold text-2xl">
          My Tests
        </h1>

        {isPending ? (
          <main className="p-10 flex justify-center gap-10 flex-wrap">
            <Card>
              <CardHeader>
                <CardTitle className="space-y-3">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="cursor-pointer">
                <Skeleton className="h-[150px] w-[250px] rounded-xl" />
                <div className="pt-7">
                  <Skeleton className="h-4 w-[70px]" />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Skeleton className="h-4 w-[70px]" />
                <div className="flex gap-5">
                  <Skeleton className="h-4 w-[30px]" />
                  <Skeleton className="h-4 w-[30px]" />
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="space-y-3">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="cursor-pointer">
                <Skeleton className="h-[150px] w-[250px] rounded-xl" />
                <div className="pt-7">
                  <Skeleton className="h-4 w-[70px]" />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Skeleton className="h-4 w-[70px]" />
                <div className="flex gap-5">
                  <Skeleton className="h-4 w-[30px]" />
                  <Skeleton className="h-4 w-[30px]" />
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="space-y-3">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="cursor-pointer">
                <Skeleton className="h-[150px] w-[250px] rounded-xl" />
                <div className="pt-7">
                  <Skeleton className="h-4 w-[70px]" />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Skeleton className="h-4 w-[70px]" />
                <div className="flex gap-5">
                  <Skeleton className="h-4 w-[30px]" />
                  <Skeleton className="h-4 w-[30px]" />
                </div>
              </CardFooter>
            </Card>
          </main>
        ) : isError ? (
          <Lottiefiles
            loop={lottieProps.loop}
            autoplay={lottieProps.autoplay}
            animationData={lottieProps.animationData}
            height={lottieProps.height}
            width={lottieProps.width}
          />
        ) : (
          <main className="p-5 sm:p-10 flex justify-center gap-10 flex-wrap">
            {data && data?.data.length === 0 ? (
              <Lottiefiles
                loop={lottieProps.loop}
                autoplay={lottieProps.autoplay}
                animationData={lottieProps.animationData}
                height={lottieProps.height}
                width={lottieProps.width}
              />
            ) : (
              data &&
              data?.data.length > 0 &&
              data?.data?.map((item: any, index: number) => (
                <MyTestCard
                  key={index}
                  title={item.testId.title}
                  img={item.testId.banner}
                  btnUrl={`/dashboard/my-tests/test?id=${item.testId._id}`}
                  price={item.testId.price}
                  date={item.testId.updatedAt}
                  id={item.testId._id}
                />
              ))
            )}
          </main>
        )}
      </div>
    </main>
  );
}

export default MyTests;
