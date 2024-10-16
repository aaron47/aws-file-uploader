'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors 
        ${isActive ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50'}`}
      prefetch={false}
    >
      {children}
    </Link>
  );
}
