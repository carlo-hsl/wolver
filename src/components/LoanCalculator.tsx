'use client';

import React, { useState, useEffect } from 'react';

interface LoanCalculation {
  loanAmount: number;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

interface LoanCalculatorProps {
  btcAmount: number;
  targetPrice: number;
  tenor: number;
  onCalculationUpdate: (calc: LoanCalculation) => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ btcAmount, targetPrice, tenor, onCalculationUpdate }) => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    // Calculate loan amount based on BTC amount and target price
    const calculatedLoanAmount = btcAmount * targetPrice;
    setLoanAmount(calculatedLoanAmount);

    // Calculate monthly payment using the formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const r = interestRate / 100 / 12; // monthly interest rate
    const n = tenor * 12; // number of payments
    const monthly = calculatedLoanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(monthly);

    // Calculate total payment and total interest
    const total = monthly * n;
    setTotalPayment(total);
    setTotalInterest(total - calculatedLoanAmount);

    // Update parent component with calculation results
    onCalculationUpdate({
      loanAmount: calculatedLoanAmount,
      interestRate,
      monthlyPayment: monthly,
      totalPayment: total,
      totalInterest: total - calculatedLoanAmount,
    });
  }, [btcAmount, targetPrice, tenor, interestRate, onCalculationUpdate]);

  return (
    <div className="bg-[#2b2b2b] rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-white mb-4">Loan Calculator</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-300 mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount.toFixed(2)}
            readOnly
            className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-300 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
          />
        </div>
        <div>
          <label htmlFor="monthlyPayment" className="block text-sm font-medium text-gray-300 mb-1">
            Monthly Payment
          </label>
          <input
            type="number"
            id="monthlyPayment"
            value={monthlyPayment.toFixed(2)}
            readOnly
            className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
          />
        </div>
        <div>
          <label htmlFor="totalPayment" className="block text-sm font-medium text-gray-300 mb-1">
            Total Payment
          </label>
          <input
            type="number"
            id="totalPayment"
            value={totalPayment.toFixed(2)}
            readOnly
            className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
          />
        </div>
        <div>
          <label htmlFor="totalInterest" className="block text-sm font-medium text-gray-300 mb-1">
            Total Interest
          </label>
          <input
            type="number"
            id="totalInterest"
            value={totalInterest.toFixed(2)}
            readOnly
            className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator; 