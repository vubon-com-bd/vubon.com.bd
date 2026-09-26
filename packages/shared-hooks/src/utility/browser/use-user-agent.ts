import { useMemo } from 'react';

export function useUserAgent(): string {
  return useMemo(() => (typeof navigator !== 'undefined' ? navigator.userAgent : ''), []);
}
