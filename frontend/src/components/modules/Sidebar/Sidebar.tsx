'use client';

const NAV_ELEMENTS = [
  {
    text: 'home',
    href: RouteTypes.DASHBOARD,
  },
  {
    text: 'projects',
    href: RouteTypes.PROJECTS,
  },
  {
    text: 'settings',
    href: RouteTypes.DASHBOARD,
  },
];

import Link from 'next/link';
import { RouteTypes } from '@/core/enums/RouteTypes.enum';

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full border-r p-6 min-w-[240px]">
      <h3 className="font-semibold text-[24px]">Loomware</h3>
      <nav className="mt-8">
        <ul className="text-[20px] space-y-4 px-2">
          {NAV_ELEMENTS.map((item, index) => {
            return (
              <li key={`nav-${index}-${item.text}`}>
                <Link href={item.href} className="capitalize">
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
