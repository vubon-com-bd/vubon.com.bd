import type { SessionInfo } from '../../common/session/session.types';

export interface SessionServiceContract {
  create(input: {
    userId: string;
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
    ttlSeconds: number;
  }): Promise<SessionInfo>;
  get(sessionId: string): Promise<SessionInfo | null>;
  touch(sessionId: string): Promise<void>;
  revoke(sessionId: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
  listForUser(userId: string): Promise<readonly SessionInfo[]>;
}
