import Image from 'next/image';
import * as React from 'react';
import { RiPlayList2Fill } from 'react-icons/ri';

type GridCardProps = {
  title: string;
  content: number;
  thumb: string;
  contentType?: string;
};

export default function GridCard({ title, thumb, contentType }: GridCardProps) {
  const isDarkMode = localStorage.getItem('theme:guga');
  return (
    <div
      className={`w-50 delay-20 h-50 cursor-pointer rounded-md p-2 text-sm transition ease-in-out ${
        isDarkMode === 'dark'
          ? 'dark hover:bg-slate-300 hover:text-black'
          : 'border-[solid 1px #334155] hover:bg-slate-200 hover:text-black'
      }`}
    >
      <div className='h-auto w-[100%] lg:w-auto'>
        <Image
          src={thumb}
          className='h-auto rounded-md'
          alt={title}
          layout='responsive'
          width={700}
          height={600}
        />
      </div>
      <p className='mt-2 text-start'>{title}</p>
      {contentType ? (
        <p className='mt-4 flex dark:text-black rounded-sm w-[35%] items-center justify-center bg-[#DBEAFE] text-center'>
          {contentType}
          <RiPlayList2Fill width={15} className='ml-2' />
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
