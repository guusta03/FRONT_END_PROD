'use client';
import React from 'react';
import { RiTranslate2 } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

import Modal from '@/app/components/modal/modal';
import ModalContentInBuilding from '@/app/components/modal/modal-content-buildin';
import useAxios from '@/app/hooks/useAxios';

interface VideoTranscriptionProps {
  start: string;
  dur: string;
  text: string;
}

interface TranscriptionData {
  body: [
    {
      title: string;
      subtitles: {
        en: VideoTranscriptionProps[];
      };
    }
  ];
}

export default function VideoPage({
  params: { videoId },
}: {
  params: { videoId: string };
}) {
  const PlayerRef = React.useRef<ReactPlayer | null>(null);
  const [modalState, setModalState] = React.useState({
    state: false,
    word: '',
  });
  const [modalResoucePaidState, setModalResourcesPaidState] =
    React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [playbackRateVideo, setPlayback] = React.useState(1);
  const timeArray: string[] = [];
  function closeModal() {
    setModalState({ state: false, word: '' });
    setIsPlaying(true);
  }

  function closeModalResoucePaid() {
    setModalResourcesPaidState(false);
    setIsPlaying(true);
  }

  const { data } = useAxios<TranscriptionData>({
    method: 'GET',
    url: `https://silly-tan-jersey.cyclic.app/api/transcription/video/${videoId}`,
  });

  const [currentSubtitleIndex, setCurrentSubtitleIndex] = React.useState<
    number | null
  >(null);

  // React.useEffect(() => {
  //   if (data !== null && data.length > 0) {
  //     convertMillisecondsToMinutes();
  //   }
  // }, [data]);

  const handleVideoProgress = (progress: OnProgressProps) => {
    if (data) {
      const currentTime = progress.playedSeconds;
      let foundSubtitleIndex = null;

      data.body[0].subtitles.en.forEach((subtitle, index) => {
        const startTime = parseFloat(subtitle.start);
        const endTime = startTime + parseFloat(subtitle.dur);

        if (currentTime >= startTime && currentTime <= endTime) {
          foundSubtitleIndex = index;
        }
      });

      setCurrentSubtitleIndex(foundSubtitleIndex);
    }
  };

  const handleSeekMouseClick = (e: string) => {
    if (PlayerRef.current) {
      PlayerRef.current.seekTo(parseFloat(e));
    }
  };
  const handleChangeModalStateOnClick = ({
    state,
    word,
  }: {
    state: boolean;
    word: string;
  }) => {
    setModalState({ state, word });
    setIsPlaying(false);
  };

  const convertMillisecondsToMinutes = (time: any) => {
    for (const times of time) {
      const removeDots = times.start.replace('.', '');
      const milliseconds = Number(removeDots);
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedTime = `${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

      timeArray.push(formattedTime);
    }
  };

  const getWordsOnClick = (text: string) => {
    return text.split(' ');
  };

  return (
    <main className='m-w-[100%] m-auto'>
      <div className='m-auto mt-4 max-w-[83%]'>
        <div className='m-auto flex max-w-[95%] justify-between'>
          <h3 className='text-lg'>{data?.body[0].title}</h3>
          <span
            onClick={() => setModalResourcesPaidState(true)}
            className='w-30 flex cursor-pointer items-center justify-around border pb-2 pl-6 pr-6 pt-2'
          >
            <div className='ml-22'>Traduzir</div>
            <RiTranslate2 />
          </span>
        </div>
        <div className='m-auto mb-10 mt-4 flex h-[80vh] max-w-[100%] justify-center rounded-md'>
          <span className='h-[100vh] rounded-md rounded-b-lg'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              playing={isPlaying}
              playbackRate={playbackRateVideo}
              controls
              height={400}
              style={{
                width: '100%',
                height: '100vh',
              }}
              onProgress={handleVideoProgress}
              ref={PlayerRef}
            />
          </span>

          <div className='ml-8 h-[70vh] max-w-[100%] cursor-pointer overflow-auto rounded-md border-[0.5px] border-gray-300 p-3'>
            <Modal
              state={modalState.state}
              closeModal={closeModal}
              word={modalState.word}
            />
            <ModalContentInBuilding
              state={modalResoucePaidState}
              closeModal={closeModalResoucePaid}
              word=''
            />
            {data?.body[0].subtitles.en.map((enText, index) => {
              const words = getWordsOnClick(enText.text);
              const isSubtitleHighlighted = currentSubtitleIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => handleSeekMouseClick(enText.start)}
                  className={`rounded-[2px] p-1 ${
                    isSubtitleHighlighted ? 'bg-[#DBEAFE]' : ''
                  }`}
                >
                  {timeArray.map((item, index) => (
                    <span
                      key={index}
                      className='bg-[#798FC2] p-[3px] text-sm text-white'
                    >
                      {item}
                    </span>
                  ))}
                  {words.map((word, wordIndex) => (
                    <>
                      <span>{timeArray.map((time) => time)}</span>
                      <span
                        key={wordIndex}
                        onClick={() =>
                          handleChangeModalStateOnClick({ state: true, word })
                        }
                        className='cursor-pointer rounded-md p-[1px] hover:bg-[#e9ecf1]'
                      >
                        {word}{' '}
                      </span>
                    </>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
