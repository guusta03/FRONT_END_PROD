/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactNode, useRef, useState } from 'react';
import { ImGoogle } from 'react-icons/im';

import useAxios from '@/app/hooks/useAxios';

export default function Tooltip({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);

  const handleTooltipClick = () => {
    setShow(!show); // Alternar entre aberto e fechado
  };

  return (
    <div className='relative inline-block cursor-pointer text-black'>
      <div className='relative flex flex-col items-center'>
        <div onClick={handleTooltipClick}>{children}</div>
        <div
          className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 transform ${
            !show ? 'hidden' : ''
          }`}
        >
          <div className='rounded-md bg-white p-5 text-xs leading-none text-black shadow-lg'>
            {show ? (
              // Se show for verdadeiro, exibir o formulário de login
              <LoginForm />
            ) : (
              // Se show for falso, exibir a mensagem do tooltip
              message
            )}
          </div>
          <div className='h-0 w-0 -translate-x-1/2 -translate-y-1 rotate-180 transform border-4 border-b-4 border-l-2 border-r-2 border-t-0 border-solid border-gray-600' />
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const mailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = async () => {
    if (mailRef.current && passwordRef.current) {
      const email = mailRef.current.value;
      const password = passwordRef.current.value;

      const { data } = useAxios<{ accessToken: string }>({
        method: 'POST',
        url: 'http://localhost:5000/login',
        bodyData: {
          email: email,
          password: password,
        },
      });

      if (data && data.accessToken) {
        localStorage.setItem('guga:user', data.accessToken);
      }
    }
  };

  return (
    <form>
      <input
        className='m-auto mb-3 h-9 rounded-md border border-zinc-200 placeholder:text-sm'
        ref={mailRef}
        placeholder='email@mail.com'
        type='text'
        id='email'
        name='email'
      />
      <input
        type='password'
        ref={passwordRef}
        placeholder='senha'
        className='m-auto h-9 rounded-md border-zinc-200'
        id='password'
        name='password'
      />
      <div className='mt-3 flex h-10 w-[100%] items-center justify-between border-zinc-200 placeholder:text-sm'>
        <a href=''>Criar uma conta</a>
        <button
          onClick={handleButtonClick}
          className='h-8 rounded-md bg-[#7B7AE4] pl-5 pr-5 text-center text-white'
        >
          Entrar
        </button>
      </div>
      <hr />
      <div className='jush-10 mt-3 flex h-5 w-[100%] items-center justify-center border-zinc-200 text-sm placeholder:text-sm'>
        <ImGoogle />
        <p className='ml-6'>Entrar com google</p>
      </div>
    </form>
  );
}
