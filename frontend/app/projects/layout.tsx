import Sidebar from '@/components/modules/Sidebar/Sidebar';
import Link from 'next/link';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import React from 'react';
import Header from '@/components/modules/Header/Header';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
