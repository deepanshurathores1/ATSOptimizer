"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Nav2 from "@/components/marketing/Nav2";
import Footer from "@/components/marketing/Footer";
import { useTheme } from "next-themes";
import { Spotlight } from "@/components/ui/spotlight-new"; // Adjust the import path as needed

export default function MinimalistFAQPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const faqs = [
    {
      question: "What is ATSOptimizer?",
      answer:
        "ATSOptimizer is a powerful resume builder and analysis tool designed to help job seekers create ATS-friendly resumes and improve their chances of getting past Applicant Tracking Systems.",
    },
    {
      question: "How does ATSOptimizer work?",
      answer:
        "ATSOptimizer uses advanced algorithms to analyze your resume, suggest improvements, and help you tailor your content to match job descriptions. It also provides a user-friendly interface for building professional resumes.",
    },
    {
      question: "Is ATSOptimizer free to use?",
      answer:
        "We offer both free and premium plans. The free plan includes basic resume building and analysis features, while our premium plans offer advanced optimization tools and unlimited resume creations.",
    },
    {
      question: "Can ATSOptimizer guarantee that my resume will pass ATS scans?",
      answer:
        "While we can't guarantee 100% success, ATSOptimizer significantly improves your resume's chances of passing ATS scans by following best practices and industry standards for resume formatting and content.",
    },
    {
      question: "How often should I update my resume using ATSOptimizer?",
      answer:
        "We recommend updating your resume for each job application to tailor it to the specific job requirements. However, you should also review and update your base resume every 3-6 months or whenever you have new skills or experiences to add.",
    },
    {
      question: "Can I import my existing resume into ATSOptimizer?",
      answer:
        "Yes, you can import your existing resume in various formats (PDF, DOCX, etc.) into ATSOptimizer. Our system will analyze it and provide suggestions for improvement.",
    },
    {
      question: "Does ATSOptimizer offer resume templates?",
      answer:
        "Yes, we offer a wide range of ATS-friendly resume templates that you can customize to fit your needs and industry standards.",
    },
    {
      question: "How does ATSOptimizer handle different industries and job types?",
      answer:
        "ATSOptimizer is designed to cater to various industries and job types. Our system uses industry-specific keywords and formatting guidelines to optimize resumes for different sectors.",
    },
    {
      question: "Can I get personalized help with my resume through ATSOptimizer?",
      answer:
        "Yes, our premium plans include access to resume experts who can provide personalized feedback and suggestions to further improve your resume.",
    },
    {
      question: "Is my data safe with ATSOptimizer?",
      answer:
        "We take data privacy and security very seriously. All your personal information and resume data are encrypted and stored securely. We never share your information with third parties without your explicit consent.",
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Spotlight />
      <Nav2 />
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
        <h1 className="text-4xl font-bold mb-16 text-center font-sans">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto space-y-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} theme={theme} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function FAQItem({ question, answer, theme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4 border-b border-zinc-200 dark:border-zinc-700">
      <button
        className="w-full text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-medium font-sans ${theme === 'dark' ? 'group-hover:text-zinc-300' : 'group-hover:text-zinc-600'} transition-colors duration-200`}>
            {question}
          </h2>
          <ChevronDown
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""} ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`mt-4 leading-relaxed font-sans ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}