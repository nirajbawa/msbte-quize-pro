"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserTest } from "@/api-requests/TestRequests";
import { Skeleton } from "@/components/ui/skeleton";
import { createOrder, verifyOrder } from "@/api-requests/BuyRequest";
import useRazorpay from "react-razorpay";
import { RazorpayOptions } from "react-razorpay";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";

function Checkout() {
  const searchParams = useSearchParams();
  const { isPending, isError, data } = useQuery({
    queryKey: ["test"],
    queryFn: async () => await getUserTest(searchParams.get("id")),
  });

  const removeItemFromCart = useCartStore(
    (state: any) => state.removeItemFromCart
  );

  const [Razorpay] = useRazorpay();
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  const makePayment = async (productId: string) => {
    const key: string = process.env.RAZORPAY_API_KEY || "";

    const data = await createOrder(productId);
    const { data: order } = data;

    const options: RazorpayOptions = {
      key: key,
      name: "MSBTE Quiz Pro",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      // image: logoBase64,
      handler: async function (response: any) {
        console.log(response);

        const data = await verifyOrder({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });

        const res = data;

        if (res?.success == true) {
          removeItemFromCart(searchParams.get("id"));

          router.replace("/dashboard/my-tests");
        }
      },
    };

    const paymentObject = new Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response: any) {
      toast({
        title: "Payment failed.",
        description:
          "Payment failed. Please try again. Contact support for help",
        variant: "destructive",
      });
    });
  };

  const paymentHandler = () => {
    if (!session) {
      router.push("/sign-up");
    } else {
      if (searchParams.get("id") != null) {
        makePayment(searchParams.get("id") || "");
      }
    }
  };

  return (
    <main className="bg-white w-full min-h-screen homeLayout pt-28  gap-12 text-gray-800 flex justify-center items-center">
      <div className="blurCss w-full md:w-[60%] h-[30rem] rounded-xl flex gap-10 flex-col justify-center items-center">
        <h1 className="rowdies capitalize text-2xl text-center font-bold">
          {isPending || isError ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          ) : (
            data?.data?.title
          )}
        </h1>
        <Button variant="default" onClick={paymentHandler}>
          {isPending || isError ? (
            <Skeleton className="h-4 w-[50px]" />
          ) : (
            "Pay ₹" + data?.data?.price
          )}
        </Button>
      </div>
    </main>
  );
}

export default Checkout;
