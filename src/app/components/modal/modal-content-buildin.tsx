/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment } from 'react';

interface ModalProps {
  state: boolean;
  word: string;
  closeModal: () => void;
}

export default function Modal({ state, closeModal, word }: ModalProps) {
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
                  <span className='m-auto justify-normal'>
                    <div className='m-auto w-[100%] text-center'>
                      <h3 className='mb-4'>
                        Ops... funcionalidade em desenvolvimento. 🏗️
                      </h3>
                      <p>
                        Vocẽ está usando uma demo do nosso software. Ainda
                        estamos trabalhando pra oferecer todo nossos recursos em
                        breve.
                      </p>
                    </div>
                  </span>

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
