export function getValuesFromocalStorage(key: string): boolean {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem(key);
    return !!token;
  }
  return false;
}
