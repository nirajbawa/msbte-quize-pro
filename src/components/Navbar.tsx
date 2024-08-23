"use client";
import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, useAnimation } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { User } from "@/models/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as Use, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import useLayoutStore from "@/store/useLayoutStore";


const Navbar = () => {
  const layout = useLayoutStore((state: any) => state.layout);
  const [menu, setMenu] = useState<boolean>(false);
  const controls = useAnimation();
  const { data: session } = useSession();
  const router = useRouter();

  const openMenu = useCallback(() => {
    const preState = menu;
    controls.start({ y: 0, opacity: 0 });
    setMenu(!menu);
    if (!preState) {
      controls.start({
        y: 5,
        opacity: 10,
        transition: { duration: 2 },
      });
    } else {
      controls.start({ y: 0, opacity: 0 });
    }
  }, [menu, controls]);

  const menuOff = useCallback(() => {
    if (menu) {
      setMenu(false);
      controls.start({ y: 0, opacity: 0 });
    }
  }, [menu, controls]);

  const token = useMemo(() => session?.user as User, [session]);

  return (
    <nav
      className={`w-full h-16  flex flex-wrap justify-between px-3 md:px-36 items-center fixed blurCss z-40 ${
        layout.isNavBarHidden ? "hidden" : ""
      }`}
    >
      <Link href="/">
        <h1 className="p-5 font-extrabold text-xl rowdies text-gray-800">
          MSBTEQuiz<sup className="text-blue-500 ">Pro</sup>
        </h1>
      </Link>
      <div className="flex gap-5">
        <div className="flex flex-row xl:hidden justify-center items-center">
          <Link href="/cart" className="w-full rounded-full  flex-row">
            <Button variant="ghost">
              <ShoppingCartIcon />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                className={`cursor-pointer ${token ? "block" : "hidden"}`}
              >
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${
                    token?.username || ""
                  }&background=random&format=svg&size=30`}
                />
                <AvatarFallback>{""}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Use className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/my-tests")}
                >
                  <Store className="mr-2 h-4 w-4" />
                  <span>My Tests</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="outline" className="m-2  xl:hidden" onClick={openMenu}>
          <MenuIcon />
        </Button>
      </div>
      <motion.ul
        animate={controls}
        className={`items-center  text-md  ${
          menu
            ? "flex flex-col fixed h-screen top-0 pt-32 left-0 overflow-hidden bg-white w-full gap-6 px-3 md:px-36 z-50"
            : "hidden"
        } xl:flex xl:gap-x-2`}
      >
        <Button
          variant="outline"
          className="m-2 xl:hidden fixed top-10 right-5"
          onClick={openMenu}
        >
          <CloseIcon />
        </Button>
        <Link href="/" className="w-full">
          <li className="w-full">
            <Button
              variant="ghost"
              size={menu ? "fullSize" : "default"}
              onClick={menuOff}
            >
              Home
            </Button>
          </li>
        </Link>

        <Link href="/about" className="w-full" onClick={menuOff}>
          <li className="w-full">
            <Button variant="ghost" size={menu ? "fullSize" : "default"}>
              About
            </Button>
          </li>
        </Link>

        <Link
          href="/tests"
          className={`w-full ${token ? "flex" : "hidden"}`}
          onClick={menuOff}
        >
          <li className="w-full">
            {" "}
            <Button
              variant="ghost"
              size={menu ? "fullSize" : "default"}
              onClick={menuOff}
            >
              Tests
            </Button>
          </li>
        </Link>

        <div className="flex-row gap-2 hidden xl:flex mr-2">
          <li className="w-full rounded-full">
            <Link href="/cart">
              <Button variant="ghost" size={menu ? "fullSize" : "default"}>
                <ShoppingCartIcon />
              </Button>
            </Link>
          </li>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                className={`cursor-pointer ${token ? "block" : "hidden"}`}
              >
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${
                    token?.username || ""
                  }&background=random&format=svg&size=30`}
                />
                <AvatarFallback>{""}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <Use className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/my-tests")}
                >
                  <Store className="mr-2 h-4 w-4" />
                  <span>My Tests</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link
          href="/sign-in"
          className={`w-full ${token && "hidden"}`}
          onClick={menuOff}
        >
          <li className="w-full">
            <Button
              variant="outline"
              size={menu ? "fullSize" : "default"}
            >
                Sign In
            </Button>
          </li>
        </Link>
        <Link
          href="/sign-up"
          className={`w-full ${token && "hidden"}`}
          onClick={menuOff}
        >
          <li className="w-full">
            <Button size={menu ? "fullSize" : "default"}>Sign Up</Button>
          </li>
        </Link>
        <div
          className={`w-full ${token ? "flex" : "hidden"}`}
          onClick={() => {
            menuOff();
            signOut();
          }}
        >
          <li className="w-full">
            <Button size={menu ? "fullSize" : "default"}>Sign Out</Button>
          </li>
        </div>
      </motion.ul>
    </nav>
  );
};

export default Navbar;
