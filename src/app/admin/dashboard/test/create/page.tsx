"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import testSchema from "@/schemas/testSchema";
import uploadImageSchema from "@/schemas/uploadImageSchema";
import { useMutation } from "@tanstack/react-query";
import { uploadImage, createNewTest } from "@/api-requests/TestRequests";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function Create() {
  const createTestForm = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      title: "",
      price: "",
    },
  });

  const UploadImageForm = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
  });

  const fileRef = UploadImageForm.register("image");

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [banner, setBanner] = useState<string | null>(null);
  const router = useRouter();

  const uploadImageMutation: any = useMutation<any>({
    mutationFn: async (data) => {
      return await uploadImage(data);
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      setBanner(data.data.imgUrl);
      setIsSubmitting(false);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Create Test Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const createNewTestMutation: any = useMutation<any>({
    mutationFn: async (data) => {
      return await createNewTest(data);
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      router.replace(`/admin/dashboard/test/edit?id=${data.data.id}`);
      setIsFormSubmitting(false);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Upload Image Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
      });
      setIsFormSubmitting(false);
    },
  });

  function onSubmitCreateTest(values: z.infer<typeof testSchema>) {
    const data: any = values;
    if (banner != null) {
      data["banner"] = banner;
      setIsFormSubmitting(true);
      createNewTestMutation.mutate(data);
    } else {
      toast({
        title: "Error",
        description: "Please upload banner image.",
      });
    }
  }

  function onSubmitImageUpload(values: z.infer<typeof uploadImageSchema>) {
    const formData = new FormData();
    formData.append("file", values.image[0]);
    uploadImageMutation.mutate(formData);
    setIsSubmitting(true);
  }

  return (
    <main className="w-full homeLayout pt-28 gap-12 text-gray-800 flex justify-center flex-col items-center pb-28 ">
      <Form {...createTestForm}>
        <form
          onSubmit={createTestForm.handleSubmit(onSubmitCreateTest)}
          className="space-y-8 w-96"
        >
          <FormField
            control={createTestForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createTestForm.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="price" {...field} type="number" min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Form {...UploadImageForm}>
        <form
          onSubmit={UploadImageForm.handleSubmit(onSubmitImageUpload)}
          className="space-y-8 w-96"
          encType="multipart/form-data"
        >
          <div className="flex justify-between items-center gap-5">
            <FormField
              control={UploadImageForm.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Banner</FormLabel>
                  <div className="h-32 flex justify-center items-center cursor-pointer border-gray-100 border-2 rounded-sm">
                    <FormControl>
                      <Input
                        placeholder="Image"
                        {...fileRef}
                        type="file"
                        className="border-none"
                        accept=".jpeg,.jpg,.png,.svg,.webp"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  wait
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={createTestForm.handleSubmit(onSubmitCreateTest)}
            >
              {isFormSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  wait
                </>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default Create;
