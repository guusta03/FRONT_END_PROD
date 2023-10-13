import Image from 'next/image';
import * as React from 'react';

type GridCardProps = {
  title: string;
  content: number;
  thumb: string;
};

export default function GridCard({ title, content, thumb }: GridCardProps) {
  return (
    <div className='w-65 h-64 cursor-pointer rounded-md p-2 hover:bg-[#F7F2FF] transition ease-in-out delay-20'>
      <div className='h-36 w-[100%]'>
        <Image
          src={thumb}
          className='h-36 w-[100%] rounded-md'
          alt={title}
          width={500}
          height={500}
        />
      </div>
      <p className='text-start'>{title}</p>
      <p>{content}</p>
    </div>
  );
}
