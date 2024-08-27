import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface TestCardProps {
  title: "Advanced Java 200 Questions";
  img: any;
  btnUrl: string;
  price: string;
}

const TestCard = ({ title, img, btnUrl, price }: TestCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={`${
            title.length > 23 ? "mb-0" : "mb-6"
          } text-center leading-4 text-xl`}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={img}
          alt="Example Image"
          width={500}
          height={500}
          style={{ objectFit: "cover", width: "100%", height: "13rem" }}
        />
        <div className="pt-7 flex justify-center w-full">
          <span className="font-bold mr-1">Price : </span>{" "}
          {parseFloat(price) < 1 ? "free" : price + " ₹"}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={btnUrl}>
          <Button size="sm">Buy</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
