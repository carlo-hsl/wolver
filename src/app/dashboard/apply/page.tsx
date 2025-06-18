'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import MobileNav from "@/components/navigation/MobileNav";

interface LoanApplication {
  btcAmount: number;
  targetPrice: number;
  tenor: number;
  downPayment: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export default function Apply() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [application, setApplication] = useState<LoanApplication>({
    btcAmount: 1,
    targetPrice: 50000,
    tenor: 12,
    downPayment: 0,
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0,
  });

  const calculateLoan = () => {
    const totalValue = application.btcAmount * application.targetPrice;
    const downPayment = totalValue * 0.2; // 20% down payment
    const loanAmount = totalValue - downPayment;
    const interestRate = 0.08; // 8% APR
    const monthlyRate = interestRate / 12;
    const numberOfPayments = application.tenor;

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setApplication({
      ...application,
      downPayment,
      monthlyPayment,
      totalInterest,
      totalPayment,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the application to your backend
    console.log('Submitting application:', application);
    router.push('/dashboard');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <Sidebar />
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#2b2b2b] rounded-lg shadow-sm p-6">
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-white">Apply for BTC-Backed Loan</h1>
                <p className="mt-2 text-sm text-gray-400">
                  Get a loan using your Bitcoin as collateral
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="btcAmount" className="block text-sm font-medium text-gray-300 mb-1">
                      BTC Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="btcAmount"
                        id="btcAmount"
                        value={application.btcAmount}
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            btcAmount: Number(e.target.value),
                          });
                          calculateLoan();
                        }}
                        className="block w-full px-6 py-4 text-center text-lg font-medium bg-[#1E2026] border border-gray-700 rounded-md focus:ring-[#FC7E10] focus:border-[#FC7E10] text-white"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">BTC</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="targetPrice" className="block text-sm font-medium text-gray-300 mb-1">
                      Target Price
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="targetPrice"
                        id="targetPrice"
                        value={application.targetPrice}
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            targetPrice: Number(e.target.value),
                          });
                          calculateLoan();
                        }}
                        className="block w-full pl-8 pr-4 py-4 text-center text-lg font-medium bg-[#1E2026] border border-gray-700 rounded-md focus:ring-[#FC7E10] focus:border-[#FC7E10] text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-300 mb-1">
                      Loan Term
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="loanTerm"
                        id="loanTerm"
                        value={application.tenor}
                        onChange={(e) => {
                          setApplication({
                            ...application,
                            tenor: Number(e.target.value),
                          });
                          calculateLoan();
                        }}
                        className="block w-full px-6 py-4 text-center text-lg font-medium bg-[#1E2026] border border-gray-700 rounded-md focus:ring-[#FC7E10] focus:border-[#FC7E10] text-white"
                        placeholder="12"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">months</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1E2026] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Total Value</span>
                    <span className="text-lg font-semibold text-white">
                      {formatCurrency(application.btcAmount * application.targetPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Down Payment (20%)</span>
                    <span className="text-lg font-semibold text-white">
                      {formatCurrency(application.downPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Loan Amount</span>
                    <span className="text-lg font-semibold text-white">
                      {formatCurrency(application.btcAmount * application.targetPrice - application.downPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Monthly Payment</span>
                    <span className="text-lg font-semibold text-white">
                      {formatCurrency(application.monthlyPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Total Interest</span>
                    <span className="text-lg font-semibold text-white">
                      {formatCurrency(application.totalInterest)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#e67300] rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#FC7E10] hover:bg-[#e67300] rounded-md transition-colors duration-200"
                  >
                    Apply for Loan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 