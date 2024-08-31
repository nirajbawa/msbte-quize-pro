"use client";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import useLayoutStore from "@/store/useLayoutStore";
import { Button } from "./ui/button";

const Footer = () => {
  const layout = useLayoutStore((state: any) => state.layout);
  return (
    <footer
      className={`homeLayout flex items-center justify-between flex-col-reverse sm:flex-row py-10 ${
        layout.isFooterHidden ? "hidden" : ""
      }`}
    >
      <Link href="/">
        <div className="flex items-center flex-col sm:flex-row text-center">
          <h1 className="p-5 font-extrabold text-xl rowdies text-gray-800">
            MSBTEQuiz<sup className="text-blue-500 ">Pro</sup>
          </h1>
          <span className="hidden sm:inline mr-5">|</span> Copyright © 2024
          MsbteQuizPro
        </div>
      </Link>
      <div className="flex gap-5 justify-center items-center flex-col sm:flex-row">
        <div className="flex justify-between w-full gap-1 sm:gap-5 sm:justify-between items-center flex-col sm:flex-row">
          <Link href="/about" className="w-full flex justify-center items-center">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/contact-us" className="w-full flex justify-center items-center">
            <Button variant="ghost">Contact Us</Button>
          </Link>
          <Link href="/privacy-policy" className="w-full flex justify-center items-center">
            <Button variant="ghost">Privacy Policy</Button>
          </Link>
          <Link href="/term-of-use" className="w-full flex justify-center items-center">
            <Button variant="ghost">Terms and Conditions</Button>
          </Link>
        </div>
   
        <Link href="https://wa.me/9359839551" target="_blank"><WhatsAppIcon className="text-green-400 cursor-pointer" />
        </Link>
     
      </div>
    </footer>
  );
};

export default Footer;
