import type { SessionInfo } from '../../common/session/session.types';

export interface SessionStore {
  get(sessionId: string): Promise<SessionInfo | null>;
  set(session: SessionInfo): Promise<void>;
  delete(sessionId: string): Promise<void>;
  listByUser(userId: string): Promise<readonly SessionInfo[]>;
  deleteByUser(userId: string): Promise<void>;
}
