'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Verify() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [simulatedCode] = useState('123456'); // This simulates our verification code
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (!storedEmail) {
      router.push('/');
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digits
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = verificationCode.join('');
    if (enteredCode === simulatedCode) {
      // In a real app, we would verify this with the backend
      router.push('/create-password');
    } else {
      alert('Invalid code. For testing, use: ' + simulatedCode);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1E2026] rounded-2xl shadow-xl mx-4">
        {/* Logo and Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
            WOLVER
          </h1>
          <p className="text-[22px] font-medium text-white">Email Verification</p>
          <p className="text-sm text-gray-400">
            Enter the 6-digit code sent to<br />
            <span className="text-white">{email}</span>
          </p>
        </div>

        {/* Verification Code Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold bg-[#2B2F36] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={verificationCode.some(digit => !digit)}
            className={`w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg transition-all duration-200 font-medium
              ${verificationCode.some(digit => !digit)
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:from-orange-600 hover:to-orange-500'}`}
          >
            Verify
          </button>
        </form>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Didn't receive the code?{' '}
            <button className="text-orange-400 hover:text-orange-300 font-medium">
              Resend
            </button>
          </p>
        </div>
      </div>
    </main>
  );
} 