'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoanCalculator from '@/components/LoanCalculator';

interface LoanFormData {
  btcAmount: number;
  targetPrice: number;
  tenor: number;
  downPayment: number;
}

interface LoanCalculation {
  totalValue: number;
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export default function LoanApplication() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LoanFormData>({
    btcAmount: 0,
    targetPrice: 0,
    tenor: 12,
    downPayment: 0,
  });
  const [calculation, setCalculation] = useState<LoanCalculation>({
    totalValue: 0,
    downPayment: 0,
    loanAmount: 0,
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0,
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Implement loan submission logic
    console.log('Submitting loan application:', formData);
    router.push('/loan/success');
  };

  const handleCalculationUpdate = (calc: LoanCalculation) => {
    setCalculation(calc);
    setFormData(prev => ({
      ...prev,
      downPayment: calc.downPayment
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Loan Application</h1>
          <p className="text-gray-400">Complete the form below to apply for your Bitcoin loan</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 text-center ${
                  step < currentStep ? 'text-green-500' : step === currentStep ? 'text-white' : 'text-gray-500'
                }`}
              >
                <div className={`h-2 mb-2 ${
                  step <= currentStep ? 'bg-green-500' : 'bg-gray-700'
                }`}></div>
                <span className="text-sm">Step {step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Loan Amount</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    BTC Amount
                  </label>
                  <input
                    type="number"
                    value={formData.btcAmount}
                    onChange={(e) => setFormData({ ...formData, btcAmount: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter BTC amount"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Price Target</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Target Price (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.targetPrice}
                    onChange={(e) => setFormData({ ...formData, targetPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter target price"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Loan Terms</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Loan Tenor (months)
                  </label>
                  <select
                    value={formData.tenor}
                    onChange={(e) => setFormData({ ...formData, tenor: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value={12}>12 months</option>
                    <option value={24}>24 months</option>
                    <option value={36}>36 months</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Loan Summary</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">BTC Amount: {formData.btcAmount} BTC</p>
                    <p className="text-gray-300">Target Price: ${formData.targetPrice.toLocaleString()}</p>
                    <p className="text-gray-300">Loan Tenor: {formData.tenor} months</p>
                    <p className="text-gray-300">Down Payment: ${formData.downPayment.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loan Calculator */}
          {currentStep > 1 && (
            <div className="mt-8">
              <LoanCalculator
                btcAmount={formData.btcAmount}
                targetPrice={formData.targetPrice}
                tenor={formData.tenor}
                onCalculationUpdate={handleCalculationUpdate}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 ml-auto"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 