export function hasTokenInLocalStorage(key: string): boolean {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem(key);
    return !!token;
  }
  return false;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}
