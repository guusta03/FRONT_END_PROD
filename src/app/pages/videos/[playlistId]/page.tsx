'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import GridCard from '@/components/grid/GridCard';

import useAxios from '@/app/hooks/useAxios';

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

export default function PlayListPage({
  params: { playlistId },
}: {
  params: { playlistId: string };
}) {
  const router = useRouter();
  const { data, error, loading } = useAxios<{ items: VideoItem[] }>({
    method: 'GET',
    url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyCh9URtblsgUvSx1Ju0eJHzzveCZb-iVME`,
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const handleGetVideId = (id: string) => {
    router.push(`transcription/${id}`);
  };

  return (
    <main>
      <div className='m-auto mb-10 mt-10 grid w-[78.5%] grid-cols-5'>
        {data.items.map((item: VideoItem, index: number) => (
          <span
            key={index}
            onClick={() => handleGetVideId(item.snippet.resourceId.videoId)}
          >
            {item.snippet.thumbnails.maxres && (
              <GridCard
                thumb={item.snippet.thumbnails.maxres.url}
                title={item.snippet.title}
                content={0}
              />
            )}
          </span>
        ))}
      </div>

      {/* <div className='flex m-auto w-[78%] mb-11'>
        <a
          href='#'
          className='mr-3 flex h-10 dark:bg-slate-800 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        >
          <svg
            className='mr-2 h-3.5 w-3.5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M13 5H1m0 0 4 4M1 5l4-4'
            />
          </svg>
          Previous
        </a>
        <a
          href='#'
          className='flex h-10 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        >
          Next
          <svg
            className='ml-2 h-3.5 w-3.5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 10'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M1 5h12m0 0L9 1m4 4L9 9'
            />
          </svg>
        </a>
      </div> */}
    </main>
  );
}
