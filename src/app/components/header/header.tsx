/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Bell, MenuIcon, SunMoon, User } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/buttons/Button';

import Tooltip from '@/app/components/tooltip/tooltip';

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-white bg-gradient-to-b px-4 dark:text-gray-600'>
        <div className='m-auto flex w-11/12 items-center justify-end sm:justify-between'>
          <ul className='hidden items-center justify-end sm:flex sm:w-96 sm:justify-around'>
            <li>
              <Link href='/pages/playlists'>Vídeos</Link>
            </li>
            <li>
              <Link href='/pages/historico'>Histórico de vídeos</Link>
            </li>
            <li>
              <Link href='/pages/tutorial'>Tutorial</Link>
            </li>
          </ul>
          <MenuIcon className='hidden' />
          <div className='ml-6 flex items-center justify-end space-x-2'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              <Tooltip message=''>Entrar</Tooltip>

              <User style={{ width: 20, height: 20 }} />
            </a>

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
