/* eslint-disable react/no-unescaped-entities */
import React from "react";
import AboutSections from "@/components/AboutSections";
import PrivacyPolicyAnimation from "@/assets/lottiefiles/privacy-policy.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicy = () => {
  return (
    <div className="w-full py-28 sm:pb-0">
      <header className="homeLayout mb-10">
        <h1 className="p-5 text-3xl font-extrabold rowdies text-gray-800 text-center sm:text-5xl">
          Privacy Policy
        </h1>
      </header>
      <div className="w-full min-h-screen max-h-full">
        <AboutSections
          title1="MSBTEQuizPro"
          title2=""
          content1="This Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your information when you use the MSBTE Quiz Pro service and tells you about your privacy rights and how the law protects you.
We use your personal data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator."
          content2=""
          settings={{
            flex: "flex-row",
            animation: PrivacyPolicyAnimation,
            bgColor: "bg-gray-100",
          }}
        />

      </div>
    </div>
  );
};

export default PrivacyPolicy;
