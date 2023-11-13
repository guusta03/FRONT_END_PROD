'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

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
  const [hasMorePages, setHasMorePages] = React.useState(true);
  const hasLogin = useRecoilValue(isLogged);
  const [videoData, setVideoData] = React.useState<VideoData>({ body: [] });
  const searchParams = useSearchParams();
  const router = useRouter();

  const current = React.useMemo(
    () => new URLSearchParams(Array.from(searchParams.entries())),
    [searchParams]
  );

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(current);
      params.set(name, value);
      return params.toString();
    },
    [current]
  );

  const currentPage = React.useMemo(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    console.log(pageParam);
    return Math.max(1, isNaN(pageParam) ? 1 : pageParam);
  }, [searchParams]);

  const handlePageChange = async (newPageParam: number) => {
    try {
      const response = await getAllVideosHistoryFromAPI(newPageParam);
      setVideoData(response);
      router.push(`?page=${newPageParam}`);
    } catch (error) {
      console.error('Error fetching video data:', error.message);
    }
  };

  React.useEffect(() => {
    getAllVideosHistoryFromAPI(1);
  }, []);

  async function getAllVideosHistoryFromAPI(page: number): Promise<VideoData> {
    try {
      const token = localStorage.getItem('guga:user');
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const response = await fetch(
        `https://silly-tan-jersey.cyclic.app/api/all/history/pages?page=${page}&pageSize=5`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result: VideoData = await response.json();
      setVideoData(result);
      if (!result || !result.body) {
        throw new Error('Invalid response format');
      }

      return result;
    } catch (error) {
      console.error('Error fetching video data:', error.message);
      throw error;
    }
  }

  return (
    <main className='relative h-[100vh]'>
      <div>
        {!hasLogin && (
          <div className=' m-auto h-[70vh] max-w-[70%] text-center'>
            <h3 className='mt-40'>
              Faça login ou crie uma conta para visualizar seu historico de
              vídeo 🔓
            </h3>
          </div>
        )}
      </div>

      {hasLogin && videoData.body && videoData.body.length === 0 && (
        <div className='mt-510 m-auto mb-52 max-w-[70%] text-center'>
          <h3 className='mt-40'>Nenhum vídeo encontrado</h3>
        </div>
      )}

      {hasLogin && videoData.body && videoData.body.length > 0 && (
        <>
          <div className='m-auto mt-10 max-w-[78.5%]'>
            <h3>Vídeos visto recentemente</h3>
          </div>
          <div className='h-80vh mb-330 m-auto grid max-w-[78%] lg:grid-cols-5'>
            {videoData.body.map((item: VideoItem, index: number) => (
              <div
                key={index}
                onClick={() => router.push(`transcription/${item.videoId}`)}
              >
                <GridCard
                  title={item.videoTitle}
                  content={10}
                  thumb={item.thumb}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <div className='xs:absolute xs:bottom-0 left-0 right-0 flex flex-col items-center lg:fixed lg:bottom-10'>
        <div className='xs:mt-0 mt-2 inline-flex flex-col items-center lg:flex-row'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className='mb-2 flex h-8 items-center justify-center rounded-s bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:mb-0'
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className='flex h-8 items-center justify-center rounded-e border-0 border-s border-gray-700 bg-gray-800 px-3 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            Próximo
          </button>
        </div>

        <span className='mt-2 text-sm text-gray-700 dark:text-gray-400'>
          Mostrando página{' '}
          <span className='font-semibold'>
            {currentPage}
          </span>
        </span>
      </div>
    </main>
  );
}
