'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

import logger from '@/lib/logger';

import GridCard from '@/components/grid/GridCard';

import { isLogged } from '@/app/state/isLogged';

interface VideoItem {
  videoId: string;
  videoTitle: string;
  dateViwed: string;
  thumb: string;
}

interface VideoData {
  body: VideoItem[];
}

export default function UserHistory() {
  const hasLogin = useRecoilValue(isLogged);
  const [videoData, setVideoData] = React.useState<VideoData>({ body: [] });

  React.useEffect(() => {
    getAllVideosHistoyFromAPI();
  }, []);

  const router = useRouter();

  async function getAllVideosHistoyFromAPI() {
    try {
      const token = localStorage.getItem('guga:user');
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const response = await fetch(
        'https://tiny-rose-fly-hose.cyclic.app/videos/all/history/654a76385c6417c8b0e9b982',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        }
      );
      logger(response.body);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = setVideoData(await response.json());
      return result;
    } catch (error) {
      console.error('Error sending video data:', error);
      throw error;
    }
  }

  return (
    <main className='h-[100vh]'>
      <div>
        {!hasLogin && (
          <div className='mt-510 m-auto max-w-[70%] text-center'>
            <h3 className='mt-40'>
              Faça login ou crie uma conta para visualizar seu historico de
              vídeo 🔓
            </h3>
          </div>
        )}
      </div>
      {hasLogin && videoData.body && videoData.body.length === 0 && (
        <div className='mt-510 m-auto max-w-[70%] text-center'>
          <h3 className='mt-40'>Nenhum vídeo visto recentemente</h3>
        </div>
      )}

      {hasLogin && videoData.body && videoData.body.length > 0 && (
        <>
          <div className='m-auto mb-10 mt-10 max-w-[78.5%]'>
            <h3>Vídeos visto recentemente</h3>
          </div>
          <div className='m-auto h-[100vh] max-w-[78%] mb-10 mt-10 grid lg:grid-cols-6'>
            {videoData.body &&
              hasLogin &&
              videoData.body.map((item: any, index: any) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(
                      `videos/transcription/${videoData.body[index].videoId}`
                    )
                  }
                >
                  <GridCard
                    title={item.videoTitle}
                    content={item.dateViwed}
                    thumb={item.thumb}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </main>
  );
}
