import React from 'react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { ImGoogle } from 'react-icons/im';

import logger from '@/lib/logger';

export default function LoginForm() {
  const mailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAccountAction = async (endpoint: string, successMessage: string) => {
    if (mailRef.current && passwordRef.current) {
      const email = mailRef.current.value;
      const password = passwordRef.current.value;

      try {
        setIsLoading(true);
        const response = await fetch(`https://tiny-rose-fly-hose.cyclic.app/api/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.body) {
            localStorage.setItem('guga:user', data.body);
            toast.success(successMessage);
          }
        }
        if (response.status === 400) {
          toast.error('Verifique todos os campos.');
        }
        if(response.status === 409) {
          toast.error('O usuário com o e-mail fornecido já existe')
        }
      } catch (error) {
        logger('Ocorreu um erro:', error as string);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleButtonClick = () => {
    handleAccountAction('create/account', 'Conta criada com sucesso!');
  };

  const handleAccountLogin = () => {
    handleAccountAction('account/login', 'Logado com sucesso!');
  };


  return (
    <main>
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
          <button onClick={handleButtonClick}>Criar uma conta</button>

          <button onClick={handleAccountLogin} className='h-8 rounded-md bg-[#7B7AE4] pl-5 pr-5 text-center text-white'>
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
          <button disabled className='ml-6'>Entrar com google</button>
        </div>
      </div>
    </main>
  );
}

