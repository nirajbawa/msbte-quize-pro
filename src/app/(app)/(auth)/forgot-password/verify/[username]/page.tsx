"use client";
import React, { useState } from "react";
import verifySchema from "@/schemas/verify";
import VerifyAnimation from "@/assets/lottiefiles/verify.json";
import Lottiefiles from "@/components/Lottiefiles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  verifyForgetPasswordEmail,
  verifyUser,
} from "@/api-requests/UserAuthRequest";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";
import useResetPasswordStore from "@/store/useResetPasswordStore";

const VerifyForm = () => {
  const [code, setCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const setToken = useResetPasswordStore((state: any) => state.setToken);
  const params = useParams<{ username: string }>();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const mutation: any = useMutation<any>({
    mutationFn: async (data) => {
      return await verifyForgetPasswordEmail(data);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["signUp"] });
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      setToken(data.data.token);
      router.replace(`/forgot-password/reset`, { scroll: false });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.log("myerror", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Sign Up Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
      });
      setIsSubmitting(false);
    },
  });
  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: VerifyAnimation,
    height: "auto",
    width: "auto",
  };

  function onSubmit() {
    console.log({
      email: decodeURIComponent(params.username),
      code,
    });
    const response = verifySchema.safeParse({
      email: decodeURIComponent(params.username),
      code: code,
    });
    console.log(response);
    if (response.success) {
      mutation.mutate(response.data);
      setIsSubmitting(true);
    } else {
      toast({
        title: "Invalid code",
        description: "please enter valid code",
        variant: "destructive",
      });
    }
  }

  return (
    <main
      className={` w-full min-h-screen max-h-full homeLayout flex flex-wrap flex-col-reverse text-gray-800 sm:flex-row sm:justify-between items-center py-28 sm:py-20 sm:pb-32`}
    >
      <div className="w-full sm:w-[40%] h-full mt-14 flex flex-col justify-between gap-y-10 items-center">
        <Lottiefiles
          loop={lottieProps.loop}
          autoplay={lottieProps.autoplay}
          animationData={lottieProps.animationData}
          height={lottieProps.height}
          width={lottieProps.width}
        />
      </div>
      <div className="w-full sm:w-[50%] flex justify-center h-full flex-col sm:pt-20  xl:px-20">
        <h1 className="text-3xl font-extrabold rowdies xl:text-3xl mb-5 text-center">
          Verify Your Code
        </h1>
        <div className="flex justify-center items-center flex-col">
          <div className="space-y-2 mb-10 ">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex justify-center items-center flex-col">
            <Button onClick={onSubmit}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Verify"
              )}
            </Button>
            <Link href="/forgot-password" className="  text-blue-500 pt-12">
              Try Again
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyForm;
