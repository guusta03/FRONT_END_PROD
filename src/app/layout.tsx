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
  // const AppTheme = useRecoilValue(theme);

  return (
    <RecoilRoot>
      <html>
        <body>
          <Toaster reverseOrder={false} gutter={8} position='top-right' />
          <Header>{children}</Header>
        </body>
      </html>
    </RecoilRoot>
  );
}
