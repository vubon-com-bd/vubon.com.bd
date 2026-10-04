import type { SessionInfo } from './session.types';

/**
 * Common session store interface — platform-agnostic.
 * Client implements with memory, server implements with Redis/DB.
 */
export interface SessionStore {
  get(sessionId: string): Promise<SessionInfo | null> | SessionInfo | null;
  set(session: SessionInfo): Promise<void> | void;
  delete(sessionId: string): Promise<void> | void;
  listByUser(userId: string): Promise<readonly SessionInfo[]> | readonly SessionInfo[];
  deleteByUser(userId: string): Promise<void> | void;
}
