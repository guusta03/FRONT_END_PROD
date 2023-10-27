import React, { ReactNode, useState } from 'react';

import LoginForm from '@/app/components/Login/login'; // Import the LoginForm component

export default function Tooltip({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) {
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div className='relative inline-block cursor-pointer text-black'>
      <div className='relative flex flex-col items-center'>
        <div onClick={() => setShowLoginForm(!showLoginForm)}>{children}</div>
        <div
          className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 transform ${
            !showLoginForm ? 'hidden' : ''
          }`}
        >
          <div className='rounded-md bg-white p-5 text-xs leading-none text-black shadow-lg'>
            <LoginForm />
          </div>
          <div className='h-0 w-0 -translate-x-1/2 -translate-y-1 rotate-180 transform border-4 border-b-4 border-l-2 border-r-2 border-t-0 border-solid border-gray-600' />
        </div>
      </div>
    </div>
  );
}
