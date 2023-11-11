'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';
import '@/styles/colors.css';

import Header from '@/app/components/header/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkTheme, setIsDarkTheme] = React.useState<string | null>('');

  React.useEffect(() => {
    setIsDarkTheme(localStorage.getItem('theme:guga'));
  }, []);

  React.useEffect(() => {
    localStorage.setItem('theme:guga', isDarkTheme as string);
  }, [isDarkTheme]);

  function colorTheme() {
    if (isDarkTheme === 'dark') setIsDarkTheme('light');
    else setIsDarkTheme('dark');
  }
  return (
    <RecoilRoot>
      <html>
        <body className={`${isDarkTheme === 'dark' ? 'dark dark:bg-[#0F172A] dark:text-white ' : ''}`}>
          <Toaster reverseOrder={false} gutter={8} position='top-right' />
          <Header isDarkTheme={isDarkTheme} colorTheme={colorTheme}>
            {children}
          </Header>
        </body>
        
      </html>
    </RecoilRoot>
  );
}
