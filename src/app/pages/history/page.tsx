'use client';

import Link from 'next/link';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

import { isLogged } from '@/app/state/isLogged';

interface VideoItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
    title: string;
    description: string;
    thumbnails: {
      maxres: {
        url: string;
      };
    };
  };
}

export default function UserHistory() {
  const hasLogin = useRecoilValue(isLogged);

  return (
    <main>
      <div className='m-auto mt-56 max-w-[70%] text-center'>
        {!hasLogin ? (
          <>
            <h3>
              Faça login ou crie uma conta para visualizar seu historico de
              vídeo 🔓
            </h3>
          </>
        ) : (
          <>
            <h4>Nenhum vídeo visualizado até o momento. 📹</h4>
            <br></br>
            <Link href='/pages/playlists'>Voltar para página inicial</Link>
          </>
        )}
      </div>
    </main>
  );
}
