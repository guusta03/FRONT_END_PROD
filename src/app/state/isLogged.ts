import { atom } from 'recoil';

import { getValuesFromocalStorage } from '@/lib/helper';

export const isLogged = atom<boolean>({
  key: 'token',
  default: getValuesFromocalStorage('guga:user'),
});
