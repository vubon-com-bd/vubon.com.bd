import { useContext } from 'react';
import { SessionContext } from '../contexts/session.context';
import type { SessionContextValue } from '../contexts/session.context';

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within <SessionProvider>');
  return ctx;
}
