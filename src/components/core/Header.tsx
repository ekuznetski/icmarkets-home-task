'use client';

import { faSplotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  return (
    <div className='w-full mb-4 bg-zinc-900 text-white py-4'>
      <div className='container px-4 sm:px-2 text-sm font-bold mx-auto flex gap-x-6 items-center'>
        <Link href='/' className='text-xl flex items-center gap-x-2'>
          <FontAwesomeIcon icon={faSplotch} />
          Crypto Portfolio
        </Link>
        <div className='flex gap-x-4 mt-1'>
          <Link href='/' className={pathname === '/' ? 'underline text-green-400' : ''}>
            Home
          </Link>
          <Link
            href='/portfolio'
            className={pathname === '/portfolio' ? 'underline text-green-400' : ''}
          >
            Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
