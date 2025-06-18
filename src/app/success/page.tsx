'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Success() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (!storedEmail) {
      router.push('/');
      return;
    }
    setEmail(storedEmail);

    // Auto-redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleContinue = () => {
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1E2026] rounded-2xl shadow-xl mx-4">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Image
              src="/wolver-logo-white.png"
              alt="Wolver"
              width={160}
              height={42}
              className="h-auto w-40"
              priority
            />
          </div>
          <p className="text-[22px] font-medium text-white">Account Created!</p>
          <p className="text-sm text-gray-400">
            Welcome to Wolver,<br />
            <span className="text-white">{email}</span>
          </p>
          <p className="text-sm text-gray-400 mt-4">
            You will be automatically redirected to your dashboard in 5 seconds...
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg transition-all duration-200 font-medium hover:from-orange-600 hover:to-orange-500"
        >
          Continue to Dashboard
        </button>
      </div>
    </main>
  );
} 