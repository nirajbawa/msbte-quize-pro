"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { useFieldArray } from "react-hook-form";
import mcqQuestions from "@/schemas/mcqQuestions";
import z from "zod";
import useMcqEditStore from "@/store/useMcqEditStore";
import ClientOnly from "@/components/ClientOnly";
import CloseIcon from "@mui/icons-material/Close";
import {
  saveQuestions,
  submitQuestions,
} from "@/api-requests/QuestionsRequest";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";
import uuid from "react-uuid";
import { Textarea } from "@/components/ui/textarea";

function Edit() {
  const searchParams = useSearchParams();
  const mcqEditStore = useMcqEditStore((state: any) => state.mcqEditForm);
  const setStoreState = useMcqEditStore((state: any) => state.setStoreState);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const loadData = useMcqEditStore((state: any) => state.loadData);
  const removeEditFormData = useMcqEditStore(
    (state: any) => state.removeEditFormData
  );

  const form = useForm<z.infer<typeof mcqQuestions>>({
    defaultValues: {
      questions: mcqEditStore,
    },
    resolver: zodResolver(mcqQuestions),
  });

  const { register, control, handleSubmit, watch, reset } = form;

  const formValues = watch();

  const { fields, remove, append } = useFieldArray({
    control,
    name: "questions",
  });

  const mutation: any = useMutation<any>({
    mutationFn: async (data) => {
      const id = searchParams.get("id");
      return await submitQuestions(id, data);
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Sign Up Failed",
        description:
          axiosError?.response?.data?.message || "something went wrong",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof mcqQuestions>> = (values) => {
    setIsSubmitting(true);
    mutation.mutate(values.questions);
  };

  const saveState = async () => {
    try {
      const id = searchParams.get("id");
      await saveQuestions(id, formValues.questions);
    } catch (error) {}
  };

  const addQuestion = async () => {
    append({
      question: "",
      a: "",
      b: "",
      c: "",
      d: "",
      answer: "",
      questionId: uuid(),
    });
    try {
      const id = searchParams.get("id");
      await saveQuestions(id, formValues.questions);
    } catch (error) {}
  };

  const removeQuestion = async (index: number) => {
    remove(index);
    const data = formValues.questions.filter((item, i) => i != index);
    removeEditFormData(data);
    try {
      const id = searchParams.get("id");
      await saveQuestions(id, data);
    } catch (error) {}
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      loadData(id);
    }
  }, [searchParams, loadData]);

  useEffect(()=>{
    setStoreState();
  }, [])

  useEffect(() => {
    reset({ questions: mcqEditStore });
  }, [mcqEditStore, reset]);

  return (
    <ClientOnly>
      <main className="w-full homeLayout pt-28 gap-12 text-gray-800 flex justify-end flex-col md:flex-wrap md:flex-row pb-28 ">
        <div className="w-[70%]">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {fields.map(({ id }, index) => {
                return (
                  <div
                    key={id}
                    className="bg-slate-100 mb-4 p-5 pt-3 py-10 rounded-xl"
                  >
                    <div className="flex justify-end items-center">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => removeQuestion(index)}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                    <FormField
                      control={control}
                      name={`questions.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="pl-1">
                            Question {index + 1} :
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Question"
                              {...field}
                              {...register(`questions.${index}.question`)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-y-5 mt-5">
                      <div className="w-full flex gap-10">
                        <div className="w-[50%]">
                          <FormField
                            control={control}
                            name={`questions.${index}.a`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="pl-1">A</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="A"
                                    {...field}
                                    {...register(`questions.${index}.a`)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[50%]">
                          <FormField
                            control={control}
                            name={`questions.${index}.b`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="pl-1">B</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="B"
                                    {...field}
                                    {...register(`questions.${index}.b`)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex gap-10">
                        <div className="w-[50%]">
                          <FormField
                            control={control}
                            name={`questions.${index}.c`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="pl-1">C</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="C"
                                    {...field}
                                    {...register(`questions.${index}.c`)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="w-[50%]">
                          <FormField
                            control={control}
                            name={`questions.${index}.d`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="pl-1">D</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="D"
                                    {...field}
                                    {...register(`questions.${index}.d`)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-[50%]">
                        <FormField
                          control={control}
                          name={`questions.${index}.answer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="pl-1">Answer</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Answer"
                                  {...field}
                                  {...register(`questions.${index}.answer`)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-[50%]" hidden>
                        <FormField
                          control={control}
                          name={`questions.${index}.questionId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="pl-1">questionId</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="questionId"
                                  {...field}
                                  {...register(`questions.${index}.questionId`)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
          </Form>
        </div>
        <div className="h-screen w-[20%]">
          <div className="bg-white drop-shadow-xl h-80 fixed w-64 p-5 rounded-md ">
            <div className="flex gap-5 flex-wrap justify-between items-start">
              <Button type="button" onClick={addQuestion}>
                Add Question
              </Button>

              <Button type="button" onClick={saveState}>
                Save
              </Button>
              <Button onClick={handleSubmit(onSubmit)}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    wait
                  </>
                ) : (
                  "Publish"
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </ClientOnly>
  );
}

export default Edit;
