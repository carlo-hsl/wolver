'use client';

import { useState } from 'react';
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import MobileNav from "@/components/navigation/MobileNav";

interface Loan {
  id: string;
  amount: number;
  status: 'active' | 'completed' | 'pending';
  startDate: Date;
  endDate: Date;
  interestRate: number;
  monthlyPayment: number;
  remainingBalance: number;
  totalPayments: number;
}

// Dummy data
const dummyLoans: Loan[] = [
  {
    id: 'LOAN-001',
    amount: 100000,
    status: 'active',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2029-01-01'),
    interestRate: 5.5,
    monthlyPayment: 1666.67,
    remainingBalance: 75000,
    totalPayments: 15
  },
  {
    id: 'LOAN-002',
    amount: 50000,
    status: 'completed',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2023-01-01'),
    interestRate: 4.5,
    monthlyPayment: 833.33,
    remainingBalance: 0,
    totalPayments: 36
  }
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export default function MyLoans() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');

  const filteredLoans = dummyLoans.filter(loan => 
    activeTab === 'all' ? true : loan.status === activeTab
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
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

            {/* Header */}
            <div className="md:flex md:items-center md:justify-between mb-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-white">My Loans</h1>
                <p className="mt-1 text-sm text-gray-400">
                  View and manage your loan accounts
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FC7E10] hover:bg-[#e67300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC7E10]">
                  Apply for New Loan
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`${
                    activeTab === 'active'
                      ? 'border-[#FC7E10] text-[#FC7E10]'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Active Loans
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`${
                    activeTab === 'completed'
                      ? 'border-[#FC7E10] text-[#FC7E10]'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Completed Loans
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`${
                    activeTab === 'all'
                      ? 'border-[#FC7E10] text-[#FC7E10]'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  All Loans
                </button>
              </nav>
            </div>

            {/* Loans List */}
            <div className="space-y-6">
              {filteredLoans.map((loan) => (
                <div key={loan.id} className="bg-[#2b2b2b] rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">Loan #{loan.id}</h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(loan.startDate)} - {formatDate(loan.endDate)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        loan.status === 'active'
                          ? 'bg-green-900/50 text-green-400'
                          : loan.status === 'completed'
                          ? 'bg-blue-900/50 text-blue-400'
                          : 'bg-yellow-900/50 text-yellow-400'
                      }`}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Loan Amount</p>
                        <p className="text-lg font-medium text-white">{formatCurrency(loan.amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Interest Rate</p>
                        <p className="text-lg font-medium text-white">{loan.interestRate}% APR</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Monthly Payment</p>
                        <p className="text-lg font-medium text-white">{formatCurrency(loan.monthlyPayment)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Remaining Balance</p>
                        <p className="text-lg font-medium text-white">{formatCurrency(loan.remainingBalance)}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">
                        View Details
                      </button>
                      {loan.status === 'active' && (
                        <button className="px-4 py-2 text-sm font-medium text-[#FC7E10] hover:text-[#e67300]">
                          Make Payment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
} 