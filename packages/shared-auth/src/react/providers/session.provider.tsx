import { useMemo, type ReactNode } from 'react';
import { isSessionActive } from '../../common/session/session.validator';
import type { SessionInfo } from '../../common/session/session.types';
import { SessionContext } from '../contexts/session.context';

export interface SessionProviderProps {
  readonly children: ReactNode;
  readonly session: SessionInfo | null;
}

export function SessionProvider({ children, session }: SessionProviderProps): JSX.Element {
  const value = useMemo(
    () => ({
      session,
      expiresAt: session?.expiresAt ?? null,
      isActive: isSessionActive(session),
    }),
    [session]
  );
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
