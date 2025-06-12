"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-[#2b2b2b] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/wolver-logo-white.png"
                alt="Wolver"
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 text-gray-300 hover:text-white focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-[#FC7E10] flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <span>John Doe</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#2b2b2b] ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/loans"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      My Loans
                    </Link>
                    <Link
                      href="/documents"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Documents
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      onClick={() => {/* Add logout logic */}}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 