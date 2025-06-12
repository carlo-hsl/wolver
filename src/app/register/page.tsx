"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PasswordCreation from "./components/PasswordCreation";
import { motion } from 'framer-motion';

type RegistrationStep = "email" | "verification" | "password" | "success";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<RegistrationStep>("email");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification code");
      }

      setStep("verification");
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Verification failed");
      }

      setStep("password");
    } catch (err: any) {
      setError(err.message || "Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordComplete = async (password: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Here you would typically make an API call to create the account
      // For now, we'll just simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep("success");
      // After 2 seconds, redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl font-bold text-white">
              WOLVER
            </h1>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-[#2b2b2b] p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

          {/* Google SSO Button */}
          <button 
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 p-3 rounded-lg font-medium hover:bg-gray-100 transition-colors mb-6"
            onClick={() => {/* TODO: Implement Google SSO */}}
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-600 rounded bg-[#1a1a1a] focus:ring-3 focus:ring-orange-500"
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                I agree to Wolver's{' '}
                <Link href="/terms" className="text-orange-500 hover:text-orange-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-orange-500 hover:text-orange-400">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white rounded-lg p-3 font-medium hover:bg-orange-600 transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 hover:text-orange-400">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <Link href="/support" className="hover:text-gray-400">Support</Link>
          {' • '}
          <Link href="/feedback" className="hover:text-gray-400">Feedback</Link>
        </div>
      </motion.div>
    </main>
  );
} 