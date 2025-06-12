'use client';

import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreedToTerms) {
      // Store email for verification page
      sessionStorage.setItem('userEmail', email);
      router.push('/verify');
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
          <p className="text-[22px] font-medium text-white">Welcome to Wolver</p>
          <p className="text-sm text-gray-400">Enter your email to get started</p>
        </div>

        {/* Social Sign-in Button */}
        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-50 text-gray-900 rounded-lg transition-all duration-200 font-medium">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4 text-sm text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#2B2F36] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 rounded border-gray-700 bg-[#2B2F36] text-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to Wolver's{' '}
                <a href="#" className="text-orange-400 hover:text-orange-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-orange-400 hover:text-orange-300">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!agreedToTerms || !email}
            className={`w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg transition-all duration-200 font-medium
              ${(!agreedToTerms || !email)
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:from-orange-600 hover:to-orange-500'}`}
          >
            Next
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-orange-400 hover:text-orange-300 font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
