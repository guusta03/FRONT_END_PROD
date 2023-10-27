import Image from 'next/image';
import * as React from 'react';

type GridCardProps = {
  title: string;
  content: number;
  thumb: string;
};

export default function GridCard({ title, thumb }: GridCardProps) {
  const isDarkMode = localStorage.getItem('theme:guga');
  return (
    <div
      className={`w-50 delay-20 h-64 cursor-pointer rounded-md p-2 transition ease-in-out ${
        isDarkMode === 'dark'
          ? 'hover:bg-slate-300 hover:text-white'
          : 'hover:bg-slate-200 hover:text-black'
      }`}
    >
      <div className='h-36 w-[100%]'>
        <Image
          src={thumb}
          className='h-36 w-[100%] rounded-md'
          alt={title}
          width={900}
          height={900}
        />
      </div>
      <p className='text-start'>{title}</p>
    </div>
  );
}
