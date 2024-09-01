/* eslint-disable react/no-unescaped-entities */
import React from "react";
import AboutSections from "@/components/AboutSections";
import TermOfUseAnimation from "@/assets/lottiefiles/term-of-use.json.json";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

const TermOfUse = () => {
  return (
    <div className="w-full pt-28 pb-0 sm:pb-0">
      <header className="homeLayout mb-10">
        <h1 className="p-5 text-3xl font-extrabold rowdies text-gray-800 text-center sm:text-5xl">
          Terms and Conditions
        </h1>
      </header>
      <div className="w-full min-h-screen max-h-full ">
        <AboutSections
          title1="MSBTEQuizPro"
          title2=""
          content1={`Welcome to MSBTE Quiz Pro, accessible via msbtequizpro.msbtewallah.in. This website is owned and operated by MSBTE Quiz Pro ("Company," "we," "our," or "us"). By accessing or using the Site, you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Site.`}
          content2=""
          height="h-[15rem] sm:h-auto"
          settings={{
            flex: "flex-row",
            animation: TermOfUseAnimation,
            bgColor: "bg-gray-100",
          }}
        />
        <div className="w-full px-5 sm:homeLayout flex flex-wrap flex-col text-gray-800 sm:justify-between py-16 sm:py-20 sm:pb-32 xl:py-10 ">
          <div>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
              <p className="text-gray-700">
                The MSBTE Quiz Pro website located at <Link href="https://msbtequizpro.msbtewallah.in/" className="text-blue-600 underline">msbtequizpro.msbtewallah.in</Link> is a copyrighted work belonging to MSBTE Quiz Pro. Certain features of the Site may be subject to additional guidelines, terms, or rules, which will be posted on the Site in connection with such features. All such additional terms, guidelines, and rules are incorporated by reference into these Terms.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Acceptance of Terms</h2>
              <p className="text-gray-700">
                These Terms of Use describe the legally binding terms and conditions that govern your use of the Site. By accessing or using the Site, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, do not use the Site. You must be at least 18 years of age to use the Site.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Access to the Site</h2>
              <p className="text-gray-700">
                Subject to these Terms, MSBTE Quiz Pro grants you a non-transferable, non-exclusive, revocable, limited license to access the Site solely for your personal, non-commercial use.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Restrictions</h2>
              <p className="text-gray-700">
                The rights granted to you in these Terms are subject to the following restrictions:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>You shall not sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Site.</li>
                <li>You shall not change, make derivative works of, disassemble, reverse compile, or reverse engineer any part of the Site.</li>
                <li>You shall not access the Site to build a similar or competitive website.</li>
                <li>Except as expressly stated herein, no part of the Site may be copied, reproduced, distributed, republished, downloaded, displayed, posted, or transmitted in any form or by any means unless otherwise indicated.</li>
                <li>Any future release, update, or other addition to the functionality of the Site shall be subject to these Terms.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                MSBTE Quiz Pro reserves the right to change, suspend, or cease the Site with or without notice. MSBTE Quiz Pro will not be liable to you or any third-party for any changes, interruptions, or termination of the Site or any part.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">No Support or Maintenance</h2>
              <p className="text-gray-700">
                MSBTE Quiz Pro has no obligation to provide you with any support in connection with the Site.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
              <p className="text-gray-700">
                All intellectual property rights, including copyrights, patents, trademarks, and trade secrets, in the Site and its content are owned by MSBTE Quiz Pro or its suppliers. These Terms and access to the Site do not grant you any rights, title, or interest in or to any intellectual property rights, except for the limited access rights expressed in Section 3. MSBTE Quiz Pro and its suppliers reserve all rights not granted in these Terms.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">User Content</h2>
              <p className="text-gray-700">
                "User Content" means any and all information and content that a user submits to the Site. You are exclusively responsible for your User Content and bear all risks associated with its use. User Content must not violate our Acceptable Use Policy.
              </p>
              <p className="text-gray-700 mt-4">
                You grant MSBTE Quiz Pro an irrevocable, non-exclusive, royalty-free, worldwide license to use your User Content for the purpose of including it on the Site. You waive any claims of moral rights with respect to your User Content.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Acceptable Use Policy</h2>
              <p className="text-gray-700">
                You agree not to use the Site to:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Collect, upload, transmit, display, or distribute any User Content that violates any third-party rights or is unlawful, harassing, abusive, or otherwise objectionable.</li>
                <li>Upload, transmit, or distribute any harmful software or unsolicited advertising.</li>
                <li>Harvest or collect information about other users without their consent.</li>
                <li>Interfere with or disrupt the Site or networks connected to it.</li>
                <li>Attempt unauthorized access to the Site or harass other users.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                MSBTE Quiz Pro reserves the right to review, remove, or modify User Content and take appropriate action if you violate these Terms.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Third-Party Links and Ads</h2>
              <p className="text-gray-700">
                The Site may contain links to third-party websites and services, and/or advertisements for third-parties. MSBTE Quiz Pro is not responsible for the content or practices of any third-party sites or ads. Use these links and ads at your own risk.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Disclaimers</h2>
              <p className="text-gray-700">
                The Site is provided "as-is" and "as available," and MSBTE Quiz Pro disclaims all warranties, including implied warranties of merchantability and fitness for a particular purpose. MSBTE Quiz Pro does not guarantee the Site will meet your requirements or be available uninterrupted.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Limitation on Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, MSBTE Quiz Pro and its suppliers are not liable for any indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the Site. Our liability is limited to $50.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Term and Termination</h2>
              <p className="text-gray-700">
                These Terms remain in effect while you use the Site. MSBTE Quiz Pro may suspend or terminate your rights to use the Site at any time for any reason. Upon termination, your account and access to the Site will be terminated immediately.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Copyright Policy</h2>
              <p className="text-gray-700">
                MSBTE Quiz Pro respects intellectual property rights and will remove infringing materials upon notice. To report copyright infringement, provide a written notification as described in Section 14.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">General Terms</h2>
              <p className="text-gray-700">
                These Terms may be revised from time to time. Significant changes will be notified via email or posted on the Site. Continued use of the Site constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Dispute Resolution</h2>
              <p className="text-gray-700">
                All claims and disputes related to these Terms or the Site shall be resolved by binding arbitration on an individual basis.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Arbitration Agreement</h2>
              <p className="text-gray-700">
                Disputes will be resolved through binding arbitration under the rules of the American Arbitration Association. The arbitrator’s decision will be final and binding. For more information, see the full Arbitration Agreement in Section 16.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Your Privacy</h2>
              <p className="text-gray-700">
                Please review our Privacy Policy for information about how we collect, use, and protect your personal data.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Copyright/Trademark Information</h2>
              <p className="text-gray-700">
                Copyright © MSBTE Quiz Pro. All rights reserved. Trademarks and logos displayed on the Site are the property of their respective owners.
              </p>
            </section>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Term Of Use, you can contact
            us:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">
              <strong>By email : </strong>
              <a
                href="mailto:msbtewallah@gmail.com"
                className="text-blue-500 hover:underline"
              >
                msbtewallah@gmail.com
              </a>
            </li>
            <li className="mb-2">
              <strong>By visiting this page on our website : </strong>
              <Link
                href={`${process.env.BASE_URL}/contact-us`}
                className="text-blue-500 hover:underline w-full"
              >
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <strong>By phone number : </strong>
              <a
                href="tel:9359839551"
                className="text-blue-500 hover:underline"
              >
                9359839551
              </a>
            </li>
            <li className="mb-2">
              <strong>Operating Address : </strong>
              <p className="mt-1">
                MSBTE Quiz pro, Village Ranzani Tal. Taloda Dist. Nandurbar, Maharashtra India - 425413
              </p>

            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermOfUse;
