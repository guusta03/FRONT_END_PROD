import React, { ReactNode, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ImGoogle } from 'react-icons/im';
import { useRecoilState } from 'recoil';

import { hasTokenInLocalStorage } from '@/lib/helper';

import { isLogged } from '@/app/state/isLogged';

export default function Tooltip({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const handleTooltipClick = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    setHasToken(hasTokenInLocalStorage('guga:user'));
  }, []);

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
  const [hasTokenSaved, setHasTokenSaved] = useRecoilState(isLogged);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleButtonClick = async () => {
    if (mailRef.current && passwordRef.current) {
      const email = mailRef.current.value;
      const password = passwordRef.current.value;

      try {
        setIsLoading(true);
        const response = await fetch(
          'http://localhost:5000/api/create/account',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: 'guga',
              email: email,
              password: password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.body) {
            localStorage.setItem('guga:user', data.body);
            toast.success('Conta criada com sucesso!');

            setHasTokenSaved(true);
          }
        }
        if (response.status === 400) {
          toast.error('Verique todos os campos.');
        }
      } catch (erro) {
        console.error('Ocorreu um erro:', erro);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
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
          {!isLoading ? (
            'Entrar'
          ) : (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='mr-2 inline h-4 w-4 animate-spin fill-slate-50 text-gray-200 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </button>
      </div>
      <hr />
      <div className='jush-10 mt-3 flex h-5 w-[100%] items-center justify-center border-zinc-200 text-sm placeholder:text-sm'>
        <ImGoogle />
        <p className='ml-6'>Entrar com google</p>
      </div>
    </div>
  );
}
