import { createContext } from 'react';
import type { SessionInfo } from '../../common/session/session.types';

export interface SessionContextValue {
  readonly session: SessionInfo | null;
  readonly expiresAt: string | null;
  readonly isActive: boolean;
}

export const SessionContext = createContext<SessionContextValue | null>(null);
