"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOrders } from "@/api-requests/OrdersRequest";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ErrorAnimations from "@/assets/lottiefiles/error-not-fetch.json";
import LoadingAnimation from "@/assets/lottiefiles/loading.json";
import Lottiefiles from "@/components/Lottiefiles";

function Order() {
  const [page, setPage] = useState(1);

  const { isPending, isError, data } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(page),
    placeholderData: keepPreviousData,
  });

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: ErrorAnimations,
    height: "auto",
    width: "auto",
  };

  if (isError) {
    return (
      <main className="w-full min-h-screen homeLayout  px-24 flex flex-col justify-center items-center">
        <Lottiefiles
          loop={lottieProps.loop}
          autoplay={lottieProps.autoplay}
          animationData={lottieProps.animationData}
          height={lottieProps.height}
          width={lottieProps.width}
        />
      </main>
    );
  }

  if (isPending) {
    return (
      <main className="w-full min-h-screen homeLayout px-24 flex flex-col justify-center items-center">
        <div className="w-48 h-60">
          <Lottiefiles
            loop={lottieProps.loop}
            autoplay={lottieProps.autoplay}
            animationData={LoadingAnimation}
            height={lottieProps.height}
            width={lottieProps.width}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen pr-5 pl-20 pt-24 pb-10 flex flex-col justify-between">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sn.No.</TableHead>
            <TableHead>Order Id</TableHead>
            <TableHead>Test Id</TableHead>
            <TableHead>Razorpay Order Id</TableHead>
            <TableHead>Razorpay Payment Id</TableHead>
            <TableHead>status</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>method</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.data.map((item: any, index: number) => {
            return (
              <TableRow key={item._id}>
                <TableCell className="font-medium text-center">
                  {(page - 1) * 10 + index + 1}
                </TableCell>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.testId}</TableCell>
                <TableCell>{item?.razorpay_order_id}</TableCell>
                <TableCell>{item?.razorpay_payment_id}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.userEmail}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item?.method}</TableCell>
                <TableCell>{item.currency}</TableCell>
                <TableCell className="text-center">{item.amount} ₹</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => {
                  setPage((old) => (old - 1 < 1 ? old : old - 1));
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => {
                  setPage((old) =>
                    old + 1 > data?.data.totalPages ? old : old + 1
                  );
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}

export default Order;
