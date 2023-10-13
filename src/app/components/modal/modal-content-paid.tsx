/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';

interface ModalProps {
  state: boolean;
  closeModal: () => void;
}

export default function ModalContentPaid({ state, closeModal }: ModalProps) {
  const plans = [
    { meses: 1, valor: 19.9 },
    { meses: 3, valor: 15.9 },
    { meses: 6, valor: 10.9, market: 'Mais comum' },
  ];

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
                    Tradução de transcrição
                  </Dialog.Title>

                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Infelizmente esse recurso é pago. Por 19,90 por mês você
                      pode ter acesso a tradução das transcrições e outros
                      recursos
                      <br></br>
                      <br></br>
                      Modo Pro Incluí <br></br> <br></br>- Tradução de qualquer
                      transcrição <br></br>- Voz mais realista pra treino de
                      prunúncia <br></br>- Salvar frases em seu deck de
                      repetição espaçada <br></br>
                    </p>
                    <span className='mt-6 flex justify-around'>
                      {plans.map((plan, index) => (
                        <span
                          key={index}
                          className={`cursor-pointer rounded-md border pb-5 pl-4 pr-3 pt-5 text-center ${plan.market ? 'bg-[#5959e4] text-slate-50' : ''}`}
                        >
                          <p>{plan.market ? plan.market : ''}</p>
                          <a href='https://buy.stripe.com/test_28obJZ1FQaNs3w48ww'>
                            {plan.meses} Mês R${plan.valor}
                          </a>
                        </span>
                      ))}
                    </span>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
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
