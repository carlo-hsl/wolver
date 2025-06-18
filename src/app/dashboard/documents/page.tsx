'use client';

import { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import MobileNav from '@/components/navigation/MobileNav';

interface Document {
  id: string;
  name: string;
  type: 'loan_agreement' | 'statement' | 'tax_form' | 'other';
  date: Date;
  size: string;
  status: 'available' | 'pending' | 'expired';
}

// Dummy data
const dummyDocuments: Document[] = [
  {
    id: 'DOC-001',
    name: 'Loan Agreement - LOAN-001',
    type: 'loan_agreement',
    date: new Date('2024-01-01'),
    size: '2.4 MB',
    status: 'available',
  },
  {
    id: 'DOC-002',
    name: 'Monthly Statement - January 2024',
    type: 'statement',
    date: new Date('2024-02-01'),
    size: '1.2 MB',
    status: 'available',
  },
  {
    id: 'DOC-003',
    name: 'Tax Form 1098 - 2023',
    type: 'tax_form',
    date: new Date('2024-01-31'),
    size: '0.8 MB',
    status: 'available',
  },
];

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function Documents() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | Document['type']>('all');

  const filteredDocuments = dummyDocuments.filter(doc =>
    activeFilter === 'all' ? true : doc.type === activeFilter
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <Sidebar />
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
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
                <h1 className="text-2xl font-bold text-white">Documents</h1>
                <p className="mt-1 text-sm text-gray-400">
                  Access and manage your loan-related documents
                </p>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FC7E10] hover:bg-[#e67300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC7E10]">
                  Upload Document
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'all'
                      ? 'bg-[#FC7E10] text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  All Documents
                </button>
                <button
                  onClick={() => setActiveFilter('loan_agreement')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'loan_agreement'
                      ? 'bg-[#FC7E10] text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Loan Agreements
                </button>
                <button
                  onClick={() => setActiveFilter('statement')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'statement'
                      ? 'bg-[#FC7E10] text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Statements
                </button>
                <button
                  onClick={() => setActiveFilter('tax_form')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'tax_form'
                      ? 'bg-[#FC7E10] text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Tax Forms
                </button>
              </div>
            </div>

            {/* Documents List */}
            <div className="bg-[#2b2b2b] rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-800/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{doc.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-400">
                            {doc.type.split('_').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-400">{formatDate(doc.date)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-400">{doc.size}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            doc.status === 'available'
                              ? 'bg-green-900/50 text-green-400'
                              : doc.status === 'pending'
                              ? 'bg-yellow-900/50 text-yellow-400'
                              : 'bg-red-900/50 text-red-400'
                          }`}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-[#FC7E10] hover:text-[#e67300] mr-4">
                            Download
                          </button>
                          <button className="text-gray-400 hover:text-white">
                            Share
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 