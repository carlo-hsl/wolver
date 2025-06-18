"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  onMenuClick: () => void;
}

interface Notification {
  id: number;
  type: 'loan' | 'system' | 'security';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

  // Sample notifications - in a real app, this would come from an API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'loan',
      title: 'Loan Application Approved',
      message: 'Your loan application for $5,000 has been approved.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'system',
      title: 'New Feature Available',
      message: 'Check out our new loan calculator tool!',
      time: '1 day ago',
      read: false,
    },
    {
      id: 3,
      type: 'security',
      title: 'New Login Detected',
      message: 'A new device logged into your account.',
      time: '2 days ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'loan':
        return (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-[#FC7E10]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
      case 'security':
        return (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <nav className="bg-[#2b2b2b] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FC7E10]"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
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

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                className="relative p-1 text-gray-400 hover:text-white focus:outline-none"
              >
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#FC7E10] ring-2 ring-[#2b2b2b]" />
                )}
              </button>

              {isNotificationMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-[#2b2b2b] ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 flex justify-between items-center border-b border-gray-700">
                      <h3 className="text-sm font-medium text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-[#FC7E10] hover:text-[#e67300]"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-400 text-center">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-700 cursor-pointer ${
                              !notification.read ? 'bg-gray-700/50' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white">{notification.title}</p>
                                <p className="text-sm text-gray-400">{notification.message}</p>
                                <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                              </div>
                              {!notification.read && (
                                <div className="flex-shrink-0">
                                  <span className="inline-block h-2 w-2 rounded-full bg-[#FC7E10]" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-700">
                      <Link
                        href="/notifications"
                        className="block text-center text-sm text-[#FC7E10] hover:text-[#e67300]"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
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