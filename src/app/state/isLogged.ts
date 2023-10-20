import { atom } from 'recoil';

import { hasTokenInLocalStorage } from '@/lib/helper';

export const isLogged = atom<boolean>({
  key: 'token',
  default: hasTokenInLocalStorage('guga:user'),
});
