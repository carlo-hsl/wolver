'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CreatePassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  // Password requirements state
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false,
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (!storedEmail) {
      router.push('/');
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  // Check password requirements
  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      number: /\d/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const allRequirementsMet = Object.values(requirements).every(Boolean);
    if (!allRequirementsMet) {
      alert('Please meet all password requirements');
      return;
    }

    // In a real app, we would send this to the backend
    // For now, we'll just simulate success
    router.push('/success');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1E2026] rounded-2xl shadow-xl mx-4">
        {/* Logo and Title */}
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
          <p className="text-[22px] font-medium text-white">Create Password</p>
          <p className="text-sm text-gray-400">
            Create a strong password for<br />
            <span className="text-white">{email}</span>
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2B2F36] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2B2F36] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Password Requirements */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300">Password Requirements:</p>
            <ul className="space-y-1 text-sm">
              <li className={`flex items-center gap-2 ${requirements.length ? 'text-green-500' : 'text-gray-500'}`}>
                {requirements.length ? '✓' : '○'} At least 8 characters
              </li>
              <li className={`flex items-center gap-2 ${requirements.number ? 'text-green-500' : 'text-gray-500'}`}>
                {requirements.number ? '✓' : '○'} Contains a number
              </li>
              <li className={`flex items-center gap-2 ${requirements.lowercase ? 'text-green-500' : 'text-gray-500'}`}>
                {requirements.lowercase ? '✓' : '○'} Contains a lowercase letter
              </li>
              <li className={`flex items-center gap-2 ${requirements.uppercase ? 'text-green-500' : 'text-gray-500'}`}>
                {requirements.uppercase ? '✓' : '○'} Contains an uppercase letter
              </li>
              <li className={`flex items-center gap-2 ${requirements.special ? 'text-green-500' : 'text-gray-500'}`}>
                {requirements.special ? '✓' : '○'} Contains a special character
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={!password || !confirmPassword || !Object.values(requirements).every(Boolean)}
            className={`w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg transition-all duration-200 font-medium
              ${(!password || !confirmPassword || !Object.values(requirements).every(Boolean))
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:from-orange-600 hover:to-orange-500'}`}
          >
            Create Password
          </button>
        </form>
      </div>
    </main>
  );
} 