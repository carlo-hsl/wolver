'use client';

import { useState } from 'react';

interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setCalculation({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-[#2b2b2b] rounded-lg shadow-sm p-8">
      <h3 className="text-lg font-semibold text-white mb-6">Loan Calculator</h3>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-300 mb-2">
            Loan Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="loanAmount"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="block w-full pl-8 pr-4 py-4 text-center text-lg font-medium bg-[#1E2026] border border-gray-700 rounded-md focus:ring-[#FC7E10] focus:border-[#FC7E10] text-white"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-300 mb-2">
            Interest Rate (%)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              name="interestRate"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="block w-full px-6 py-4 text-center text-lg font-medium bg-[#1E2026] border border-gray-700 rounded-md focus:ring-[#FC7E10] focus:border-[#FC7E10] text-white"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-400 sm:text-sm">%</span>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-300 mb-2">
            Loan Term (months)
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              name="loanTerm"
              id="loanTerm"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="block w-full px-6 py-4 text-center text-lg font-medium bg-[#1E2026] border border-gray-700 rounded-md focus:ring-[#FC7E10] focus:border-[#FC7E10] text-white"
              placeholder="12"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-400 sm:text-sm">months</span>
            </div>
          </div>
        </div>

        <button
          onClick={calculateLoan}
          className="w-full py-4 px-4 bg-[#FC7E10] text-white rounded-md hover:bg-[#e67300] transition-colors duration-200 font-medium text-lg"
        >
          Calculate
        </button>

        {calculation && (
          <div className="mt-8 space-y-4 bg-[#1E2026] p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Monthly Payment</span>
              <span className="text-lg font-semibold text-white">
                {formatCurrency(calculation.monthlyPayment)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Total Payment</span>
              <span className="text-lg font-semibold text-white">
                {formatCurrency(calculation.totalPayment)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Total Interest</span>
              <span className="text-lg font-semibold text-white">
                {formatCurrency(calculation.totalInterest)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 