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

  const handleGetVideId = (id: string, data: any) => {
    router.push(`transcription/${id}`);
    console.log(data)
  };

  console.log(data)

  return (
    <main>
      <div className=' m-auto mb-10 h-[100vh] mt-10 grid max-w-[78.5%] grid-cols-1 md:grid-cols-4 lg:grid-cols-5'>
        {data?.items.map((item: VideoItem, index: number) => (
          <span
            key={index}
            onClick={() => handleGetVideId(item.snippet.resourceId.videoId, item.snippet)}
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
