/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/buttons/Button';

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <header className=' sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-white bg-gradient-to-b px-4'>
        <div className='m-auto flex w-11/12 items-center justify-between'>
          <ul className='flex w-96 items-center justify-around'>
            <li>
              <Link href='/pages/playlists'>Vídeos</Link>
            </li>
            <li>
              <Link href='/pages/historico'>Histórico de vídeos</Link>
            </li>
            <li>
              <Link href='/videos'>Tutorial</Link>
            </li>
          </ul>

          <div className='flex items-center justify-end space-x-2'>
            {/* <a
              target='_blank'
              href='https://github.com/vercel/nextjs-ai-chatbot/'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              <span className='hidden sm:block'>Torne-se um apoiador!</span>
            </a> */}
            <a
              target='_blank'
              href='/'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              <span className='ml-2 hidden md:flex'>Login</span>
            </a>
            <a
              href='https://discord.com/invite/english'
              target='_blank'
              className={cn(buttonVariants())}
            >
              <span className='hidden text-white sm:block'>Comunidade</span>
            </a>
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}
