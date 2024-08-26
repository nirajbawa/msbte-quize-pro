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
import dayjs from "dayjs";

interface TestCardProps {
  title: string;
  img: any;
  btnEditUrl: string;
  btnOpenUrl: string;
  price: string;
  date: string;
}

const TestEditCard = ({
  title,
  img,
  btnEditUrl,
  btnOpenUrl,
  price,
  date,
}: TestCardProps) => {
  return (
    <div className="w-80">
      <Card>
        <CardHeader>
          <CardTitle
            className={`${title.length > 20 ? "mb-0" : "mb-6"} leading-8`}
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="cursor-pointer">
          <Image
            src={img}
            alt="Example Image"
            width={500}
            height={500}
            style={{ objectFit: "cover", width: "100%", height: "12rem" }}
          />
          <p className="pt-7">
            <span className="font-bold mr-1">Price : </span>{" "}
            {parseFloat(price) < 1 ? "free" : price + " ₹"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          {dayjs(date).format("DD/MM/YYYY")}
          <div className="flex gap-5">
            <Link href={btnOpenUrl}>
              <Button size="sm">Open</Button>
            </Link>
            <Link href={btnEditUrl}>
              <Button size="sm">Edit</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestEditCard;
