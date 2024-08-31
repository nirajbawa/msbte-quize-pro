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
import signInSchema from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SignInAnimation from "@/assets/lottiefiles/sign-in.json";
import Lottiefiles from "@/components/Lottiefiles";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: SignInAnimation,
    height: "auto",
    width: "auto",
  };
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: values.email,
      password: values.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      router.push("/admin/dashboard");
    }

    setIsSubmitting(false);
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
          Admin Sign In
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
            <div className="w-full flex justify-between items-center mt-10">
              <Button type="submit">
                {" "}
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default SignInForm;
