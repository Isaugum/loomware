'use client';

import { RouteTypes } from '@/core/enums/RouteTypes.enum';
import useSignOut from '@/hooks/api/useSignOut';
import { redirect } from 'next/navigation';

export default function Header() {
  const { signOut } = useSignOut();

  const onSingOut = async () => {
    await signOut();
    redirect(RouteTypes.SIGN_IN);
  };

  return (
    <header className="flex items-center justify-between p-4">
      <div></div>
      <div
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border hover:bg-gray-100"
        aria-label="User menu"
        onClick={() => onSingOut()}
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
  );
}
