'use client';

import { useRouter } from 'next/navigation';

export default function LoanSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#2b2b2b] shadow rounded-lg p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900/50">
            <svg
              className="h-6 w-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Loan Application Submitted
          </h2>
          <p className="mt-2 text-gray-400">
            Your loan application has been successfully submitted. We will review your
            application and get back to you within 24 hours.
          </p>
          <div className="mt-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FC7E10] hover:bg-[#e67300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC7E10]"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 