import { atom } from 'recoil';

export const theme = atom<boolean>({
  key: 'theme',
  default: false,
});
