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
      className={`w-50 delay-20 h-64 cursor-pointer rounded-md p-2 transition ease-in-out text-sm ${
        isDarkMode === 'dark'
          ? 'hover:bg-slate-300 hover:text-white'
          : 'hover:bg-slate-200 hover:text-black border-[solid 1px #334155]'
      }`}
    >
      <div className='h-auto w-[100%] lg:w-auto'>
        <Image
          src={thumb}
          className='h-36 rounded-md'
          alt={title}
          layout="responsive"
          width={700}
          height={600} 
        />
      </div>
      <p className='text-start mt-2'>{title}</p>
    </div>
  );
}
