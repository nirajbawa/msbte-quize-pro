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
import signUp from "@/schemas/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SignUpAnimation from "@/assets/lottiefiles/sign-up.json";
import Lottiefiles from "@/components/Lottiefiles";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "@/api-requests/UserAuthRequest";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();


  const mutation: any = useMutation<any>({
    mutationFn: async (data) => {
      return await signUpRequest(data);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      router.replace(`/verify/${email}`);
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
    animationData: SignUpAnimation,
    height: "auto",
    width: "auto",
  };
  const form = useForm<z.infer<typeof signUp>>({
    resolver: zodResolver(signUp),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const { watch } = form;

  const email = watch("email");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signUp>) {
    setIsSubmitting(true);
    mutation.mutate(values);
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
        <h1 className="text-3xl font-extrabold rowdies xl:text-5xl mb-3">
          Sign Up
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full h-full sm:pt-10"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type={`${showPassword ? "text" : "password"}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex items-center gap-x-2 mt-10 px-1">
                    <Checkbox
                      id="terms1"
                      onClick={() => setShowPassword(!showPassword)}
                    />{" "}
                    Show Password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm"
                      type={`${showPassword ? "text" : "password"}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-between items-center mt-10">
              <p>
                Already a member?{" "}
                <Link href="/sign-in" className="text-blue-500">
                  Sign In
                </Link>
              </p>
              <Button type="submit">
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

export default SignUpForm;
