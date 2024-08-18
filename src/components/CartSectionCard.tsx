"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import dayjs from "dayjs";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import useCartStore from "@/store/useCartStore";

interface TestCardProps {
  title: string;
  img: any;
  btnUrl: string;
  price: string;
  id: string;
  date: string;
}

const CartSectionCard = ({
  title,
  img,
  btnUrl,
  price,
  id,
  date,
}: TestCardProps) => {
  const removeItemFromCart = useCartStore(
    (state: any) => state.removeItemFromCart
  );
  return (
    <div className="w-72 md:w-80">
      <Card>
        <CardHeader>
          <CardTitle
            className={`${title.length > 23 ? "mb-0" : "mb-6"} text-xl`}
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
          <div className="pt-7 flex w-full">
            <span className="font-bold mr-1">Price : </span> {price} ₹
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {dayjs(date).format("DD/MM/YYYY")}

          <div className="flex gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      removeItemFromCart(id);
                    }}
                  >
                    <RemoveShoppingCartIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add To Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Link href={btnUrl}>
              <Button size="sm">Buy</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartSectionCard;
