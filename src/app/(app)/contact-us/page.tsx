import ContactSection from "@/components/ContactSection";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

const ContactUs = () => {
  return (
    <div className="py-28 sm:pb-0">
      <header className="homeLayout mb-10">
        <h1 className="p-5 font-extrabold rowdies text-gray-800 text-center text-5xl">
          Contact Us
        </h1>
      </header>
      <div className="min-h-screen">
        <ContactSection />
      </div>
    </div>
  );
};

export default ContactUs;
