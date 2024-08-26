"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { User } from "@/models/User";
import Image from "next/image";
import LoadingAnimation from "@/assets/lottiefiles/loading.json";
import Lottiefiles from "@/components/Lottiefiles";

const Dashboard = () => {
  const { data: session } = useSession();

  const lottieProps = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    height: "auto",
    width: "auto",
  };

  if (!session || !session.user) {
    return (
      <main className="w-full homeLayout min-h-screen pt-28 gap-12 text-gray-800 flex justify-center items-center flex-col md:flex-wrap md:flex-row">
        <div className="w-[30%]">
          <Lottiefiles
            loop={lottieProps.loop}
            autoplay={lottieProps.autoplay}
            animationData={lottieProps.animationData}
            height={lottieProps.height}
            width={lottieProps.width}
          />
        </div>
      </main>
    );
  }
  const token = session?.user as User;

  return (
    <main className="w-full min-h-screen h-full homeLayout px-10 pt-28 rounded-xl gap-12 text-gray-800 flex justify-between items-center flex-col">
      <div className="bg-slate-100 h-full mt-10 md:mt-5 w-96 py-28 px-20 flex flex-col gap-10 rounded-2xl">
        <div className="">
          <Image
            src={`https://ui-avatars.com/api/?name=${
              token?.username || ""
            }&background=random&format=jpeg&size=200`}
            alt="Example Image"
            width={100}
            height={100}
            className="rounded-full"
            style={{ objectFit: "cover", width: "100%", height: "14rem" }}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl capitalize font-bold text-center">
            {token?.username}
          </h1>
          <p className="text-xl">{token?.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
