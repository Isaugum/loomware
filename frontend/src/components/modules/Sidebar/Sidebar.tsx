'use client';

import Link from 'next/link';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';

export default function Sidebar() {
  return (
    <div className="flex flex-col min-w-[240px] max-w-[280px] w-[240px] h-full border-r">
      <div className="h-14 px-4 flex items-center border-b">
        <span className="font-semibold">Loomware</span>
      </div>
      <nav className="flex-1 overflow-auto p-2">
        <ul className="space-y-1">
          <li>
            <Link href={RouteTypes.DASHBOARD} className="block px-3 py-2 rounded hover:bg-gray-100">
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-100">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-100">
              Reports
            </Link>
          </li>
          <li>
            <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-100">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
