"use client";
import React, { useEffect, useRef } from "react";
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
import { testEditSchema } from "@/schemas/testSchema";
import uploadImageSchema from "@/schemas/uploadImageSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadImage, getTest, updateTest } from "@/api-requests/TestRequests";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";

function EditTest() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const id = searchParams.get("id");
      return await getTest(id);
    },
  });

  const createTestForm = useForm<z.infer<typeof testEditSchema>>({
    resolver: zodResolver(testEditSchema),
    defaultValues: {
      title: "",
      price: "",
      publish: "",
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
      queryClient.invalidateQueries({ queryKey: ["test"] });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Upload Image Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
      });
      setIsSubmitting(false);
    },
  });

  const updateTestMutation: any = useMutation<any>({
    mutationFn: async (data) => {
      const id = searchParams.get("id");
      return await updateTest(id, data);
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      setIsFormSubmitting(false);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Create Test Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
      });
      setIsFormSubmitting(false);
    },
  });

  function onSubmitCreateTest(values: z.infer<typeof testEditSchema>) {
    const data: any = values;
    if (banner != null) {
      data["banner"] = banner;
      setIsFormSubmitting(true);
      updateTestMutation.mutate(data);
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

  useEffect(() => {
    if (data) {
      createTestForm.reset({
        title: data?.data.title,
        price: data?.data.price,
        publish: data?.data.publish.toString(),
      });
      createTestForm.setValue("publish", "true");

      setBanner(data?.data.banner);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, createTestForm.reset]);

  return (
    <ClientOnly>
      <main className="w-full homeLayout pt-28 gap-12 text-gray-800 flex justify-center flex-col items-center pb-28 ">
        <Form {...createTestForm}>
          <form
            className="space-y-8 w-96"
            onSubmit={createTestForm.handleSubmit(onSubmitCreateTest)}
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
            <div className="flex gap-x-5">
              <FormField
                control={createTestForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="price"
                        {...field}
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-y-2 flex-col w-[60%]">
                <FormField
                  control={createTestForm.control}
                  name="publish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visibility</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Public</SelectItem>
                          <SelectItem value="false">Private</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
            <div className="flex justify-center gap-x-5">
              <Button
                type="button"
                onClick={() => onSubmitCreateTest(createTestForm.getValues())}
              >
                {isFormSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    wait
                  </>
                ) : (
                  "Update"
                )}
              </Button>

              <Link
                href={`/admin/dashboard/test/questions/edit?id=${data?.data._id}`}
              >
                <Button type="button">Edit Questions</Button>
              </Link>
            </div>
          </form>
        </Form>
      </main>
    </ClientOnly>
  );
}

export default EditTest;
