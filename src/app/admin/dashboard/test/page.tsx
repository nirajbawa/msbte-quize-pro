"use client";
import { getTests } from "@/api-requests/TestRequests";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TestEditCard from "@/components/TestEditCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Lottiefiles from "@/components/Lottiefiles";
import ErrorAnimations from "@/assets/lottiefiles/error-not-fetch.json";

function Tests() {
  const [dataLength, setDataLength] = useState<number>(0);

  const { data, fetchNextPage, hasNextPage, isError, isPending } =
    useInfiniteQuery({
      queryKey: ["Tests"],
      queryFn: getTests,
      initialPageParam: 1,
      getNextPageParam: (page) => {
        if (page.data.totalPages === page.data.currentPage) {
          return undefined;
        }
        return page.data.currentPage + 1;
      },
    });

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: ErrorAnimations,
    height: "auto",
    width: "auto",
  };

  useEffect(() => {
    if (data) {
      setDataLength(data.pages.length);
    }
  }, [data]);

  if (isPending) {
    return (
      <main className="w-full homeLayout pt-28 gap-12 text-gray-800 flex justify-between items-center flex-col md:flex-wrap md:flex-row">
        <div className="w-full flex justify-end">
          <Link href="/admin/dashboard/test/create">
            <Button>New</Button>
          </Link>
        </div>
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
    );
  }

  if (isError || data.pages[0]?.data.totalPages === 0) {
    return (
      <main className="w-full  homeLayout pt-28 gap-12 text-gray-800 flex justify-center flex-col md:flex-wrap md:flex-row">
        <div className="w-full h-full flex justify-end">
          <Link href="/admin/dashboard/test/create">
            <Button>New</Button>
          </Link>
        </div>

        <div className="w-[30%]">
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
  }

  return (
    <div className="w-full homeLayout pt-28">
      <div className="w-full flex justify-end  pb-10">
        <Link href="/admin/dashboard/test/create">
          <Button>New</Button>
        </Link>
      </div>

      <InfiniteScroll
        dataLength={dataLength}
        next={() => {
          fetchNextPage();
        }}
        hasMore={hasNextPage}
        loader={
          <div className="w-full overflow-hidden flex justify-center items-center mb-5">
            <main
              className={` gap-x-16 gap-y-20 text-gray-800 flex ${
                data.pages[0].data.length < 3
                  ? "justify-start"
                  : "justify-center"
              } pb-16 items-center flex-col md:flex-wrap md:flex-row`}
            >
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
          </div>
        }
      >
        <main
          className={` gap-x-16 gap-y-20 text-gray-800 flex ${
            data.pages[0].data.length < 3 ? "justify-start" : "justify-center"
          } pb-16 items-center flex-col md:flex-wrap md:flex-row`}
        >
          {data &&
            data.pages.map((group, i) => (
              <>
                {group.data.data.map((item: any, index: number) => (
                  <TestEditCard
                    key={index}
                    title={item.title}
                    img={item.banner}
                    btnEditUrl={`/admin/dashboard/test/edit?id=${item._id}`}
                    btnOpenUrl="/"
                    price={item.price}
                    date={item.updatedAt}
                  />
                ))}
              </>
            ))}
        </main>
      </InfiniteScroll>
    </div>
  );
}

export default Tests;
