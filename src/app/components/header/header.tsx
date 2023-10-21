/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Bell, MenuIcon, SunMoon, User } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import { hasTokenInLocalStorage } from '@/lib/helper';
import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/buttons/Button';

import Tooltip from '@/app/components/tooltip/tooltip';
import { isLogged } from '@/app/state/isLogged';

export default function Header({ children }: { children: React.ReactNode }) {
  const [hasTokenSaved, setHasTokenSaved] = useRecoilState(isLogged);

  React.useEffect(() => {
    setHasTokenSaved(hasTokenInLocalStorage('guga:user'));
  }, []);

  return (
    <main>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-white bg-gradient-to-b px-4 dark:text-gray-600'>
        <div className='m-auto flex w-11/12 items-center justify-end sm:justify-between'>
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
                <Tooltip message=''>Entrar</Tooltip>

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

            {/* <a target='_blank' className={cn(buttonVariants())}>
              <RiTranslate color='#FFFF' className='text-slate-50' />
              <Tooltip message='Ingles'>Estou aprendendo</Tooltip>
            </a> */}

            {/* <a
              href='https://discord.com/invite/english'
              target='_blank'
              className={cn(buttonVariants())}
            >
              <RiDiscordLine color='#FFFF' />
              <span className=' ml-2 hidden text-white sm:block'>
                Comunidade
              </span>
            </a> */}
            <SunMoon />
            <Bell />
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}
