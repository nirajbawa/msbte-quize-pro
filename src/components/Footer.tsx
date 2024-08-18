"use client";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import useLayoutStore from "@/store/useLayoutStore";

const Footer = () => {
  const layout = useLayoutStore((state: any) => state.layout);
  return (
    <footer
      className={`homeLayout flex-col flex items-center justify-between sm:flex-row py-10 ${
        layout.isFooterHidden ? "hidden" : ""
      }`}
    >
      <Link href="/">
        <div className="flex items-center flex-col sm:flex-row">
          <h1 className="p-5 font-extrabold text-xl rowdies text-gray-800">
            MSBTEQuiz<sup className="text-blue-500 ">Pro</sup>
          </h1>
          <span className="hidden sm:inline mr-5">|</span> Copyright © 2024
          MsbteWallah.in
        </div>
      </Link>
      <div>
        <Link href="/">
          <WhatsAppIcon className="text-green-400 cursor-pointer" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
