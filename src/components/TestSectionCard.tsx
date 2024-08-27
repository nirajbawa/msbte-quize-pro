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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useCartStore from "@/store/useCartStore";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";

interface TestCardProps {
  title: string;
  img: any;
  btnUrl: string;
  price: string;
  date: string;
  id: string;
}

const TestSectionCard = ({
  title,
  img,
  btnUrl,
  price,
  date,
  id,
}: TestCardProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const addNewItemToCart = useCartStore((state: any) => state.addNewToCartItem);
  return (
    <div className="w-72 md:w-80">
      <Card>
        <CardHeader>
          <CardTitle
            className={`${
              title.length > 20 ? "mb-0" : "mb-6"
            } leading-4 text-xl`}
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
            <span className="font-bold mr-1">Price : </span>{" "}
            {parseFloat(price) < 1 ? "free" : price + " ₹"}
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
                      toast({
                        title: "Item Added To Cart",
                        description: "Item added to cart click here to view",
                        action: (
                          <ToastAction
                            altText="Cart"
                            onClick={() => router.push("/cart")}
                          >
                            Cart
                          </ToastAction>
                        ),
                      });
                      addNewItemToCart({
                        _id: id,
                        title: title,
                        price: price,
                        banner: img,
                        updatedAt: date,
                      });
                    }}
                  >
                    <AddShoppingCartIcon />
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

export default TestSectionCard;
