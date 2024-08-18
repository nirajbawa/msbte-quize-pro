import React from "react";
import AboutSections from "@/components/AboutSections";
import WelcomeAnimation from "@/assets/lottiefiles/welcome.json";
import We from "@/assets/lottiefiles/we.json";
import JoinUs from "@/assets/lottiefiles/join-us.json";

const About = () => {
  return (
    <div className="py-28 sm:pb-0">
      <header className="homeLayout mb-10">
        <h1 className="p-5 font-extrabold rowdies text-gray-800 text-center text-5xl">
          About Us
        </h1>
      </header>
      <div className="min-h-screen">
        <AboutSections
          title1="Welcome to MSBTEQuizPro"
          title2="Our Mission"
          content1="At MSBTEQuizPro, we are dedicated to transforming the way students prepare for their MSBTE (Maharashtra State Board of Technical Education) exams. Our mission is to provide an intuitive, efficient, and comprehensive platform that empowers students to achieve academic excellence."
          content2="Our mission is simple: to enhance the learning experience and improve exam performance for every student. We believe that with the right tools and resources, every student has the potential to excel. MSBTEQuizPro aims to bridge the gap between preparation and success by offering a robust repository of Multiple Choice Questions (MCQs) specifically tailored to the MSBTE syllabus."
          settings={{
            flex: "flex-row",
            animation: WelcomeAnimation,
            bgColor: "bg-gray-100",
          }}
        />
        <AboutSections
          title1="What We Offer"
          title2="Our Vision"
          content1={
            <ul className="list-disc flex flex-col gap-y-5">
              <li>
                <b>Comprehensive Question Bank:</b> Access an extensive database
                of MCQs covering all subjects and topics within the MSBTE
                curriculum. Our questions are regularly updated to reflect the
                latest exam trends and standards.
              </li>
              <li>
                <b>Detailed Explanations: </b> Each question comes with detailed
                explanations to help you understand the concepts and improve
                your problem-solving skills.
              </li>
              <li>
                <b>Performance Tracking: </b> Monitor your progress with our
                advanced analytics. Identify your strengths and areas for
                improvement to fine-tune your preparation strategy.
              </li>
              <li>
                <b>User-Friendly Interface:</b> Our platform is designed with
                students in mind. {"It's"} easy to navigate, allowing you to
                focus on what matters most—your studies.
              </li>
              <li>
                <b>Flexible Practice Modes:</b> Choose from various practice
                modes, including timed quizzes, subject-wise tests, and custom
                exams tailored to your needs.
              </li>
            </ul>
          }
          content2="We envision a future where every student has access to the best resources and tools to achieve their academic goals. MSBTEQuizPro is committed to continually innovating and improving our platform to meet the evolving needs of students."
          settings={{
            flex: "flex-row",
            animation: We,
            bgColor: "",
          }}
        />
        <AboutSections
          title1="Why Choose MSBTEQuizPro?"
          title2="Join Us"
          content1={
            <ul className="list-disc flex flex-col gap-y-5">
              <li>
                <b>Expertly Curated Content:</b> Our team of experienced
                educators and industry experts meticulously curates each
                question to ensure it aligns with the MSBTE syllabus and exam
                standards.
              </li>
              <li>
                <b>Interactive Learning:</b>
                Engage with interactive quizzes and instant feedback to make
                learning more engaging and effective.
              </li>
              <li>
                <b>Accessible Anytime, Anywhere:</b> Prepare for your exams at
                your convenience. Our platform is accessible on multiple
                devices, so you can study anytime, anywhere.
              </li>
              <li>
                <b>Community and Support:</b> Join a community of like-minded
                students and educators. Share insights, ask questions, and
                support each other on the path to success.
              </li>
            </ul>
          }
          content2="Embark on your journey to academic excellence with MSBTEQuizPro. Whether you're aiming for top marks or seeking to improve your understanding of complex subjects, we're here to support you every step of the way."
          settings={{
            flex: "flex-row ",
            animation: JoinUs,
            bgColor: "bg-gray-100",
          }}
        />
      </div>
    </div>
  );
};

export default About;
