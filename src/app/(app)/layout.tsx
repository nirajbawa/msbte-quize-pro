import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "MSBTE Quiz Pro", template: "%s - MSBTE Quiz Pro" },
  description:
    "MSBTE Quiz Pro is an innovative online platform designed to help Maharashtra State Board of Technical Education (MSBTE) students excel in their final exams. Offering a comprehensive collection of multiple-choice quizzes covering a wide range of MSBTE online subjects, this web app allows students to purchase and practice quizzes tailored to the specific exam format. With a user-friendly interface, MSBTE Quiz Pro enables students to test their knowledge, track their progress, and build confidence ahead of their exams. Whether you're studying electronics, computer engineering, or any other technical field, MSBTE Quiz Pro provides the tools you need to succeed. Prepare effectively, boost your grades, and achieve your academic goals with MSBTE Quiz Pro.",
  keywords:
    "MSBTE Quiz Pro, MSBTE online quizzes, MSBTE MCQ practice, MSBTE final exam preparation, MSBTE online subjects, MSBTE exam practice, Technical education quizzes, Maharashtra State Board technical quizzes, Online quiz platform for MSBTE, MSBTE student resources, Buy MSBTE quizzes online, Practice quizzes for MSBTE, MSBTE multiple-choice questions, MSBTE exam prep tools, MSBTE study app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
