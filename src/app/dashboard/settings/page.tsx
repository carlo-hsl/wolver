'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import MobileNav from '@/components/navigation/MobileNav';
import Sidebar from '@/components/navigation/Sidebar';
import { Switch } from '@headlessui/react';

export default function Settings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 000-0000',
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <Sidebar />
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="lg:pl-64">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

            <div className="bg-[#2b2b2b] rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-700">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`${
                      activeTab === 'profile'
                        ? 'border-[#FC7E10] text-[#FC7E10]'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`${
                      activeTab === 'security'
                        ? 'border-[#FC7E10] text-[#FC7E10]'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                  >
                    Security
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`${
                      activeTab === 'notifications'
                        ? 'border-[#FC7E10] text-[#FC7E10]'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                  >
                    Notifications
                  </button>
                </nav>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={security.newPassword}
                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-[#1E2026] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC7E10] text-white"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-white mb-1">Email Notifications</h4>
                        <p className="text-sm text-gray-400">Receive updates about your loan status and account activity</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onChange={(checked: boolean) => setNotifications({ ...notifications, email: checked })}
                        className={`${
                          notifications.email ? 'bg-[#FC7E10]' : 'bg-gray-600'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FC7E10] focus:ring-offset-2`}
                      >
                        <span
                          className={`${
                            notifications.email ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-white mb-1">SMS Notifications</h4>
                        <p className="text-sm text-gray-400">Get important alerts via text message</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onChange={(checked: boolean) => setNotifications({ ...notifications, sms: checked })}
                        className={`${
                          notifications.sms ? 'bg-[#FC7E10]' : 'bg-gray-600'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FC7E10] focus:ring-offset-2`}
                      >
                        <span
                          className={`${
                            notifications.sms ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#e67300] rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-[#FC7E10] hover:bg-[#e67300] rounded-md transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 