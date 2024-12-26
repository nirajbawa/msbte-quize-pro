"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserTest } from "@/api-requests/TestRequests";
import { Skeleton } from "@/components/ui/skeleton";
import { createOrder, freeTest } from "@/api-requests/BuyRequest";
import useRazorpay from "react-razorpay";
import { RazorpayOptions } from "react-razorpay";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";

function Checkout() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

  const freeTestMutate: any = useMutation<any>({
    mutationFn: async (id) => {
      return await freeTest(id);
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      router.replace("/dashboard/my-tests");
    },
    onError: (error) => {
      setIsSubmitting(false);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
      });
    },
  });

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
      handler: async function (response: any) {
          router.replace("/dashboard/my-tests");
          try{
            removeItemFromCart(searchParams.get("id"));
          }
          catch(error)
          {
          }
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
        },
      },
    };

    const paymentObject = new Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response: any) {
      setIsSubmitting(false);
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
        setIsSubmitting(true);
        makePayment(searchParams.get("id") || "");
      }
    }
  };

  useEffect(() => {
    if (data?.data?.price == 0) {
      if (searchParams.get("id") != null) {
        setIsSubmitting(true);
        freeTestMutate.mutate(searchParams.get("id") || "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(()=>{
    if(isError)
      {
        router.replace("/");
      }
  })

  

  return (
    <main className="bg-white w-full min-h-screen px-5 sm:homeLayout sm:pt-28  gap-12 text-gray-800 flex justify-center items-center">
      <div className="blurCss w-full md:w-[60%] h-[30rem] rounded-xl flex px-10 gap-10 flex-col justify-center items-center">
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
          ) : isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Pay ₹" + data?.data?.price
          )}
        </Button>
      </div>
    </main>
  );
}

export default Checkout;
