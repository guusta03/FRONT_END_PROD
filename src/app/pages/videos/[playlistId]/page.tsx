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
  const { data } = useAxios<{ items: VideoItem[] }>({
    method: 'GET',
    url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyCh9URtblsgUvSx1Ju0eJHzzveCZb-iVME`,
  });

  const handleGetVideId = (id: string) => {
    router.push(`transcription/${id}`);
  };

  return (
    <main>
      <div className='m-auto mt-10 grid sm:w-[80%] sm:grid-cols-4 lg:max-w-[70%] lg:grid-cols-3'>
        {data?.items.map((item: VideoItem, index: number) => (
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
    </main>
  );
}
