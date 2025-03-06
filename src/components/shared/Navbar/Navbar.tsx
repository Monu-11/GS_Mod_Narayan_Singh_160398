'use client';

import { User, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center justify-between bg-white p-4 px-5'>
      <div className='flex items-center space-x-2'>
        <Image src='logo.svg' width={100} height={100} alt='gs-logo' />
      </div>

      <div className='relative flex items-center'>
        <User
          className='h-6 w-6 cursor-pointer'
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
        />
        {isUserMenuOpen && (
          <div
            ref={userMenuRef}
            className='absolute top-4 right-2 mt-2 w-48 rounded-lg bg-white p-2 text-black shadow-lg'
          >
            <div className='w-full max-w-[90%] truncate p-2 break-words'>
              {session?.user.email}
            </div>
            <button
              onClick={() => signOut()}
              className='w-full rounded-lg p-2 text-left text-red-600 hover:bg-gray-200'
            >
              <LogOut className='mr-2 inline' />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
