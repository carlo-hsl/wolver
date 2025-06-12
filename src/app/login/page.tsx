'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1E2026] rounded-2xl shadow-xl mx-4">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
            WOLVER
          </h1>
          <p className="text-gray-400 text-sm">Log in to Your Account</p>
        </div>

        {/* Social Sign-in Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-50 text-gray-900 rounded-lg transition-all duration-200 font-medium">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black hover:bg-gray-900 text-white rounded-lg transition-all duration-200 font-medium">
            <FaApple className="text-xl" />
            Continue with Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4 text-sm text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-[#2B2F36] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-[#2B2F36] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-[#2B2F36] text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-orange-400 hover:text-orange-300">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white rounded-lg transition-all duration-200 font-medium"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="/" className="text-orange-400 hover:text-orange-300 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
} 