import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";

interface TestCardProps {
  title: string;
  img: any;
  btnUrl: string;
  price: string;
  date: string;
  id: string;
}

const MyTestCard = ({ title, img, btnUrl, price, date, id }: TestCardProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const addNewItemToCart = useCartStore((state: any) => state.addNewToCartItem);
  return (
    <div className="w-72 md:w-80">
      <Card>
        <CardHeader>
          <CardTitle className={`${title.length > 23 ? "mb-0" : "mb-6"}`}>
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
          {dayjs("Thu Jun 13 2024 12:42:45").format("DD/MM/YYYY")}

          <div className="flex gap-4">
            <Link href={btnUrl}>
              <Button
                size="sm"
                className="flex justify-center items-center"
                onClick={() => setLoader(!loader)}
              >
                {loader ? (
                  <Loader2 className="h-4 mx-3 w-4 animate-spin" />
                ) : (
                  "Open"
                )}
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyTestCard;
