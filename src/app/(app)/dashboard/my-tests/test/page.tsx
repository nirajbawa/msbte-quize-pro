"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserTest } from "@/api-requests/TestRequests";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Loader2 } from "lucide-react";

function TestDetails() {
  const searchParams = useSearchParams();
  const [loader, setLoader] = useState<boolean>(false);

  const { isPending, isError, data } = useQuery({
    queryKey: ["testInfo"],
    queryFn: async () => await getUserTest(searchParams.get("id")),
  });

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
        <Link
          href={`/dashboard/my-tests/test/begin-test?id=${searchParams.get(
            "id"
          )}`}
        >
          <Button
            className="flex justify-center items-center"
            variant="default"
            onClick={() => setLoader(!loader)}
          >
            {isPending || isError ? (
              <Skeleton className="h-4 w-[50px]" />
            ) : loader ? (
              <Loader2 className="h-4 w-4 mx-6  animate-spin" />
            ) : (
              "Start Test"
            )}
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default TestDetails;
