"use client";
import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, useAnimation } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Home from "../app/(app)/page";
import { User } from "next-auth";

const DashboardNavbar = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const controls = useAnimation();
  const { data: session } = useSession();
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
    <nav className="w-full h-16  flex flex-wrap justify-between px-3 md:px-36 items-center fixed blurCss z-40">
      <Link href="/admin/dashboard">
        <h1 className="p-5 font-extrabold text-xl rowdies text-gray-800">
          Dashboard
        </h1>
      </Link>
      <Button variant="outline" className="m-2 xl:hidden" onClick={openMenu}>
        <MenuIcon />
      </Button>

      <motion.ul
        animate={controls}
        className={`items-center  text-md  ${menu
            ? "flex flex-col fixed h-screen top-0 pt-32 left-0 overflow-hidden bg-white w-full gap-6 px-3 md:px-36 z-50"
            : "hidden"
          } xl:flex xl:gap-x-5`}
      >
        <Button
          variant="outline"
          className="m-2 xl:hidden fixed top-10 right-5"
          onClick={openMenu}
        >
          <CloseIcon />
        </Button>

        <Link href="/sign-up" className="w-full" onClick={menuOff}>
          <li className="w-full">
            <Button size={menu ? "fullSize" : "default"}>App</Button>
          </li>
        </Link>

        <Link
          href="/admin/dashboard"
          className="w-full lg:hidden"
          onClick={menuOff}
        >
          <li className="w-full">
            <Button size={menu ? "fullSize" : "default"}>Home</Button>
          </li>
        </Link>

        <Link
          href="/admin/dashboard/test"
          className="w-full lg:hidden"
          onClick={menuOff}
        >
          <li className="w-full">
            <Button size={menu ? "fullSize" : "default"}>Test</Button>
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

export default DashboardNavbar;
