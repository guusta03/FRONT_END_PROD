/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { MenuIcon, SunMoon, User } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/buttons/Button';

import Tooltip from '@/app/components/tooltip/tooltip';
import { isLogged } from '@/app/state/isLogged';

export default function Header({
  children,
  isDarkTheme,
  colorTheme,
}: {
  children: React.ReactNode;
  isDarkTheme: string | null;
  colorTheme: () => void;
}) {
  const [hasTokenSaved, setHasTokenSaved] = useRecoilState(isLogged);

  return (
    <main className={`${isDarkTheme ? 'dark:bg-slate-800' : ''}`}>
      <header
        className={`top-0 z-50 flex h-16 w-full items-center justify-between border-b${
          isDarkTheme === 'dark'
            ? 'dark:bg-slate-800'
            : 'bg-white bg-gradient-to-b px-4'
        }`}
      >
        <div className='m-auto flex w-[85%] items-center justify-end sm:justify-between'>
          <ul className='hidden items-center justify-end sm:flex sm:w-96 sm:justify-around'>
            <li>
              <Link href='/pages/playlists'>Vídeos</Link>
            </li>
            <li>
              <Link href='/pages/history'>Histórico de vídeos</Link>
            </li>
            <li>
              <Link href='/pages/tutorial'>Tutorial</Link>
            </li>
          </ul>
          <MenuIcon className='hidden' />
          <div className='ml-6 flex items-center justify-end space-x-2'>
            {!hasTokenSaved && (
              <span className={cn(buttonVariants({ variant: 'outline' }))}>
                <Tooltip message=''>
                  <span
                    className={`${
                      isDarkTheme === 'dark' ? 'text-white' : 'text-dark'
                    }`}
                  >
                    Entrar
                  </span>
                </Tooltip>

                <User style={{ width: 20, height: 20 }} />
              </span>
            )}
            {hasTokenSaved && (
              <span
                className={cn(buttonVariants({ variant: 'outline' }))}
                onClick={() => {
                  localStorage.removeItem('guga:user');
                  setHasTokenSaved(false);
                }}
              >
                Sair
              </span>
            )}
            <SunMoon className='cursor-pointer' onClick={() => colorTheme()} />
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}
