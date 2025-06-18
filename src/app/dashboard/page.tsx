"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import MobileNav from "@/components/navigation/MobileNav";
import Link from "next/link";
import LoanCalculator from '@/components/LoanCalculator';
import BTCPriceChart from '@/components/BTCPriceChart';

interface LoanStats {
  outstandingLoan: number;
  remainingRepayments: number;
  totalInterest: number;
  nextRepaymentDate: Date;
  downPayment: number;
  repaymentsMade: number;
  totalRepaymentAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  paymentHistory: {
    date: Date;
    amount: number;
    type: "repayment" | "downpayment";
  }[];
}

// Add a new interface for user state
interface UserState {
  hasLoan: boolean;
  loanStats?: LoanStats;
}

// Dummy data for demonstration
const dummyLoanStats: LoanStats = {
  outstandingLoan: 75000,
  remainingRepayments: 45,
  totalInterest: 15000,
  nextRepaymentDate: new Date("2024-05-15"),
  downPayment: 25000,
  repaymentsMade: 15,
  totalRepaymentAmount: 100000,
  loanTerm: 60,
  interestRate: 5.5,
  monthlyPayment: 1666.67,
  paymentHistory: [
    { date: new Date("2024-01-15"), amount: 1666.67, type: "repayment" },
    { date: new Date("2024-02-15"), amount: 1666.67, type: "repayment" },
    { date: new Date("2024-03-15"), amount: 1666.67, type: "repayment" },
  ],
};

// Add dummy user state
const dummyUserState: UserState = {
  hasLoan: false, // Set to false to see the first-time user view
  loanStats: dummyLoanStats
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function Dashboard() {
  const [userState] = useState<UserState>(dummyUserState);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Only calculate progress if user has a loan
  const progressPercentage = userState.hasLoan && userState.loanStats
    ? ((userState.loanStats.repaymentsMade / userState.loanStats.loanTerm) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <Sidebar />
      
      <div className="lg:pl-64 pb-16 lg:pb-0">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Menu Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center text-gray-400 hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="ml-2">Menu</span>
              </button>
            </div>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-40 lg:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
                <div className="fixed inset-y-0 left-0 w-64 bg-[#2b2b2b] overflow-y-auto">
                  <Sidebar />
                </div>
              </div>
            )}

            <div className="md:flex md:items-center md:justify-between mb-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-white">Welcome back, John</h1>
                <p className="mt-1 text-sm text-gray-400">
                  {userState.hasLoan ? "Here's an overview of your loan status" : "Ready to start your journey?"}
                </p>
              </div>
              {userState.hasLoan && (
                <div className="mt-4 flex md:mt-0 md:ml-4">
                  <button className="inline-flex items-center px-4 py-2 border border-[#FC7E10] rounded-md shadow-sm text-sm font-medium text-[#FC7E10] bg-transparent hover:bg-[#FC7E10] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC7E10] transition-colors">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Statement
                  </button>
                </div>
              )}
            </div>

            {userState.hasLoan && userState.loanStats ? (
              // Existing loan view
              <>
                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                    <h3 className="text-gray-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Outstanding Loan
                    </h3>
                    <p className="text-2xl font-bold text-[#FC7E10]">
                      {formatCurrency(userState.loanStats.outstandingLoan)}
                    </p>
                  </div>

                  <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-gray-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Next Repayment
                    </h3>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(userState.loanStats.monthlyPayment)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Due on {formatDate(userState.loanStats.nextRepaymentDate)}
                    </p>
                  </div>

                  <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-gray-400 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Total Interest
                    </h3>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(userState.loanStats.totalInterest)}
                    </p>
                    <p className="text-sm text-gray-400">Rate: {userState.loanStats.interestRate}% APR</p>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-lg mb-8">
                  <h3 className="text-gray-400 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Repayment Progress
                  </h3>
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FC7E10] transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-gray-400">{userState.loanStats.repaymentsMade} payments made</span>
                    <span className="text-[#FC7E10] font-medium">{progressPercentage}% complete</span>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-lg">
                    <h3 className="text-gray-400 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Payment Breakdown
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Down Payment</span>
                        <span className="font-bold text-white">{formatCurrency(userState.loanStats.downPayment)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Monthly Payment</span>
                        <span className="font-bold text-white">{formatCurrency(userState.loanStats.monthlyPayment)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400">Remaining Payments</span>
                        <span className="font-bold text-white">{userState.loanStats.remainingRepayments}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2b2b2b] p-6 rounded-xl shadow-lg">
                    <h3 className="text-gray-400 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Recent Payments
                    </h3>
                    <div className="space-y-3">
                      {userState.loanStats.paymentHistory.map((payment, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                          <span className="text-gray-400">{formatDate(payment.date)}</span>
                          <span className="font-bold text-white">{formatCurrency(payment.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // First-time user view
              <div className="space-y-6">
                <div className="bg-[#2b2b2b] rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-semibold text-white">Welcome to Your Dashboard</h2>
                  <p className="mt-2 text-gray-400">
                    Get started by applying for a loan or explore our features below.
                  </p>
                  <div className="mt-8">
                    <Link
                      href="/dashboard/apply"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FC7E10] hover:bg-[#e67300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC7E10]"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Apply for a Loan
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-[#2b2b2b] rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-white">Flexible Terms</h3>
                        <p className="text-sm text-gray-400">Choose terms that work for you</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2b2b2b] rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-white">Secure Platform</h3>
                        <p className="text-sm text-gray-400">Your assets are protected</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#2b2b2b] rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-white">Fast Processing</h3>
                        <p className="text-sm text-gray-400">Quick approval and funding</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Loan Calculator */}
                    <div className="lg:col-span-4">
                      <LoanCalculator 
                        btcAmount={1} // Default value
                        targetPrice={50000} // Default value
                        tenor={12} // Default value
                        onCalculationUpdate={(calc) => {
                          // Handle calculation updates if needed
                          console.log('Loan calculation updated:', calc);
                        }}
                      />
                    </div>

                    {/* BTC Price Chart */}
                    <div className="lg:col-span-8 bg-[#2b2b2b] rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">BTC Price Chart</h3>
                      <BTCPriceChart />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
} 