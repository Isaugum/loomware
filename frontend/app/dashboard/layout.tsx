import Sidebar from '@/components/modules/Sidebar/Sidebar';
import Link from 'next/link';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between h-14 px-4 border-b">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border hover:bg-gray-100"
              aria-label="User menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21a8 8 0 0 0-16 0"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
