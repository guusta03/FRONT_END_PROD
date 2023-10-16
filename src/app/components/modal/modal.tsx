/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';

import logger from '@/lib/logger';

import TextButton from '@/components/buttons/TextButton';

import useAxios from '@/app/hooks/useAxios';

interface ModalProps {
  state: boolean;
  word: string;
  closeModal: () => void;
}

export default function Modal({ state, closeModal, word }: ModalProps) {
  const [selectedSpeed, setSelectedSpeed] = React.useState('Normal');
  const [speechRate, setSpeechRate] = React.useState(1);
  const [meaningData, setMeaningData] = React.useState<{ body: string } | null>(
    null
  );

  const { data, loading } = useAxios<{ body: string }>({
    url: `http://https://silly-tan-jersey.cyclic.app/api/meaning/word/${word}`,
    method: 'GET',
  });

  React.useEffect(() => {
    speakWordWhenModalIsOpen();
  }, [state, word]);

  React.useEffect(() => {
    if (data) {
      setMeaningData(data);
    }
  }, [data]);

  const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    const speedMap: Record<string, number> = {
      Normal: 1,
      Devagar: 0.5,
    };

    const rate = speedMap[selectedValue];

    setSelectedSpeed(selectedValue);
    setSpeechRate(rate);
  };

  function speakWordModal() {
    if ('speechSynthesis' in window) {
      const textToBeSpoken = new SpeechSynthesisUtterance(word);
      textToBeSpoken.lang = 'en-US';
      textToBeSpoken.rate = speechRate;
      window.speechSynthesis.speak(textToBeSpoken);
    } else {
      logger('A API de síntese de fala não é suportada neste navegador.');
    }
  }

  function speakWordWhenModalIsOpen() {
    if (state) {
      speakWordModal();
    }
  }

  return (
    <main>
      <Transition appear show={state} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='mb-2 text-lg font-medium leading-6 text-gray-900'
                  >
                    Meaning - {word}
                  </Dialog.Title>
                  <span className='justify-normalm m-auto flex'>
                    <div className='m-auto flex w-[100%] justify-between'>
                      <select
                        value={selectedSpeed}
                        onChange={handleSpeedChange}
                      >
                        <option value='Normal'>Normal 1x</option>
                        <option value='Devagar'>Devagar 0.5x</option>
                      </select>
                      <TextButton onClick={() => speakWordModal()}>
                        Falar
                      </TextButton>
                    </div>
                  </span>
                  <div className='mt-2 rounded-sm border border-slate-300 p-3'>
                    <p className='text-sm text-gray-500'>
                      {!meaningData ? (
                        <div>Carregando...</div>
                      ) : (
                        meaningData.body.replace(/\\n/g, '<br />')
                      )}
                    </p>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={() => {
                        setMeaningData(null);
                        closeModal();
                      }}
                    >
                      Entendi, obrigado!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}
