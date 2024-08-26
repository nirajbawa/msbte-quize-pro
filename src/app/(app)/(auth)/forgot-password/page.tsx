"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ForgotPasswordAnimation from "@/assets/lottiefiles/forgot-password.json";
import Lottiefiles from "@/components/Lottiefiles";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api-requests/UserAuthRequest";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: ForgotPasswordAnimation,
    height: "auto",
    width: "auto",
  };
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation: any = useMutation<any>({
    mutationFn: async (email) => {
      return await forgotPassword(email);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      router.replace(`/forgot-password/verify/${form.watch("email")}`);
      setIsSubmitting(false);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
      });
      setIsSubmitting(false);
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsSubmitting(true);
    mutation.mutate(values.email);
  }
  return (
    <main
      className={`bg-gray-100 w-full min-h-screen max-h-full homeLayout flex flex-wrap flex-col-reverse text-gray-800 sm:flex-row sm:justify-between items-center py-28 sm:py-20 sm:pb-32`}
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
        <h1 className="text-2xl text-center font-extrabold rowdies xl:text-4xl mb-3">
          Forgot Password
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full h-full sm:pt-10"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-center items-center mt-10">
              <Button type="submit">
                {" "}
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default ForgotPassword;
