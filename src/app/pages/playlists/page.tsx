/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable unused-imports/no-unused-vars */
'use client';

import { Info, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/buttons/Button';
import TextButton from '@/components/buttons/TextButton';
import GridCard from '@/components/grid/GridCard';

import useAxios from '@/app/hooks/useAxios';

interface VideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      maxres: {
        url: string;
      };
    };
  };
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

export default function VideoPage() {
  const router = useRouter();
  const [YouTubevideoID, setYouTubeVideId] = React.useState('');
  const [youtubeURL, setYoutubeURL] = React.useState('');
  const [dataVideo, setDataVideo] = React.useState<string>();
  const [selectedButton, setSelectedButton] = React.useState<string | null>(
    null
  );

  const textButtonList = [
    {
      text: 'TED - Ed',
      channelId: 'UCsooa4yRKGN_zEE8iknghZA',
    },
    {
      text: 'Friends - melhores momentos',
      channelId: 'UCijVIIfFzspulKc7yWA2Qhg',
    },
    {
      text: 'Mr Robot - melhores momentos',
      channelId: 'UCv-HoLYg3j53JgVC30P0mRg',
    },
    {
      text: 'Vídeo Cast - melhores momentos',
      channelId: '',
    },
    {
      text: 'Aulas - Inglês',
      channelId: 'UCvn_XCl_mgQmt3sD753zdJA',
    },
  ];

  const { data, error, loading } = useAxios<{ items: VideoItem[] }>({
    method: 'GET',
    url: `https://content.googleapis.com/youtube/v3/playlists?channelId=${dataVideo}&maxResults=${10}&part=snippet&key=AIzaSyCh9URtblsgUvSx1Ju0eJHzzveCZb-iVME`,
  });

  React.useEffect(() => {
    setDataVideo('UCsooa4yRKGN_zEE8iknghZA');
  }, []);

  const handleGetVideoId = (id: string) => {
    router.push(`videos/${id}`);
  };

  async function getVideoDataildFromId(videoID: string) {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoID}&format=json`, {
        method: 'GET'
      });

      if (response.ok) {
        const videoDetails = await response.json();
        return videoDetails;
      } else {
        throw new Error('Não foi possível obter os detalhes do vídeo');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function SendVideoDataForSaveHistory(params: any) {
    try {
      const token = localStorage.getItem('guga:user');
      if (!token) {
        throw new Error("Token not found in local storage");
      }
  
      const response = await fetch('https://silly-tan-jersey.cyclic.app/api/video/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(params), 
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending video data:', error);
      throw error;
    }
  }
  

  async function extrairIDdoVideo(url: string) {
    const startIndex = url.indexOf('v=');
    if (startIndex !== -1) {
      const videoID = url.substring(startIndex + 2);
      const dataDeHoje = new Date();
      const dataFormatada = dataDeHoje.toLocaleDateString();
      
      const videDetails = await getVideoDataildFromId(videoID)
      const hasLogin = localStorage.getItem('guga:user')
      if(hasLogin) {
        await SendVideoDataForSaveHistory({
          videoTitle: videDetails.title,
          videoId: videoID,
          thumb: videDetails.thumbnail_url,
          dateViewed: dataFormatada
        })
      }else {
        return toast.error('Login necessário. Crie uma conta se ainda não tiver.')
      }
      router.push(`videos/transcription/${videoID}`);
    } else {
      setYouTubeVideId('');
    }
  }

  function nextPagePlaylistYouTube() {
    const { data } = useAxios({
      method: 'POST',
      url: 'https://www.googleapis.com/youtube/v3/playlists?pageToken=[nextPageTokenFrom previous request]',
    });
  }

  return (
    <main className='flex flex-col justify-center align-middle'>
      <span className='m-auto mt-10 w-[78.5%] flex-col justify-start'>
        <div className='m-auto flex w-[70%] justify-center text-center'>
          <h1 className='mb-6'>Aprenda inglês com vídeos do YouTube</h1>
          <Info />
        </div>
        <div className='m-auto flex max-w-[70.5%] sm:items-center lg:w-[60%]'>
          <input
            className='mr-2 h-10 w-[100%] dark:text-black rounded border border-b-2 border-gray-300 text-left outline-0'
            title='search youtube videos'
            placeholder='https://www.youtube.com/watch?v=zb7GSB_GQ-0'
            value={youtubeURL}
            onChange={(e) => setYoutubeURL(e.target.value)}
          />
          <Button onClick={() => extrairIDdoVideo(youtubeURL)}>
            <Search color='#FFFF' />
          </Button>
        </div>
      </span>
      <span className='m-auto mt-10 flex justify-center sm:w-[90] md:w-[80%]'>
        {textButtonList.map((item, index) => (
          <TextButton
            key={index}
            onClick={() => {
              setDataVideo(item.channelId);
              setSelectedButton(item.channelId);
            }}
            variant='basic'
            className={`mr-3 cursor-pointer rounded-md border-[1px] border-gray-300 p-2 ${
              selectedButton === item.channelId ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {item.text}
          </TextButton>
        ))}
      </span>
      <div className='m-auto mb-10 mt-10 grid max-w-[78.5%] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
        {data?.items.map((item: VideoItem, index: number) => (
          <div key={index} onClick={() => handleGetVideoId(item.id)}>
            {item.snippet.thumbnails.maxres && (
              <GridCard
                thumb={item.snippet.thumbnails.maxres.url}
                title={item.snippet.title}
                contentType='Playlist'
                content={data.items.length}
              />
            )}

          </div>
        ))}
      </div>
    </main>
  );
}
