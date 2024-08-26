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
import ResetPasswordAnimation from "@/assets/lottiefiles/reset-password.json";
import Lottiefiles from "@/components/Lottiefiles";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { restPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api-requests/UserAuthRequest";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import useResetPasswordStore from "@/store/useResetPasswordStore";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const token = useResetPasswordStore((state: any) => state.token);
  const { toast } = useToast();
  const router = useRouter();

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: ResetPasswordAnimation,
    height: "auto",
    width: "auto",
  };
  const form = useForm<z.infer<typeof restPasswordSchema>>({
    resolver: zodResolver(restPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const mutation: any = useMutation<any>({
    mutationFn: async (email) => {
      return await resetPassword(email);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      router.replace(`/sign-in`);
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.log("myerror", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
      });
      setIsSubmitting(false);
    },
  });

  async function onSubmit(values: z.infer<typeof restPasswordSchema>) {
    setIsSubmitting(true);
    mutation.mutate({ password: values.password, token });
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
        <h1 className="text-3xl font-extrabold rowdies xl:text-4xl mb-3">
          Forgot Password
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full h-full sm:pt-10"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type={`${showPassword ? "text" : "password"}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type={`${showPassword ? "text" : "password"}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex items-center gap-x-2 mt-10 px-1">
                    <Checkbox
                      id="terms1"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                    Show Password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end items-center mt-10">
              <Button type="submit">
                {" "}
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Reset"
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
