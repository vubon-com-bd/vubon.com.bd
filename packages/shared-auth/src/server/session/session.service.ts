import { randomBytes } from 'node:crypto';
import type { SessionInfo } from '../../common/session/session.types';
import { MemorySessionStore } from './session-store.memory';
import type { SessionStore } from './session-store.interface';
import type { SessionServiceContract } from './session.service.interface';

/**
 * Cryptographically secure session id.
 * Format: sess_<base36-time>_<16 random bytes hex>
 */
function generateSessionId(): string {
  const time = Date.now().toString(36);
  const rand = randomBytes(16).toString('hex');
  return `sess_${time}_${rand}`;
}

/**
 * Server-side session service.
 * ⚠️ SERVER-ONLY.
 */
export class SessionService implements SessionServiceContract {
  constructor(private readonly store: SessionStore = new MemorySessionStore()) {}

  async create(input: {
    userId: string;
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
    ttlSeconds: number;
  }): Promise<SessionInfo> {
    const now = Date.now();
    const sessionId = generateSessionId();
    const session: SessionInfo = {
      sessionId: sessionId as SessionInfo['sessionId'],
      userId: input.userId as SessionInfo['userId'],
      createdAt: new Date(now).toISOString(),
      lastActiveAt: new Date(now).toISOString(),
      expiresAt: new Date(now + input.ttlSeconds * 1000).toISOString(),
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      deviceId: input.deviceId,
    };
    await this.store.set(session);
    return session;
  }

  get(sessionId: string): Promise<SessionInfo | null> {
    return this.store.get(sessionId);
  }

  async touch(sessionId: string): Promise<void> {
    const s = await this.store.get(sessionId);
    if (!s) return;
    await this.store.set({ ...s, lastActiveAt: new Date().toISOString() });
  }

  async revoke(sessionId: string): Promise<void> {
    await this.store.delete(sessionId);
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.store.deleteByUser(userId);
  }

  listForUser(userId: string): Promise<readonly SessionInfo[]> {
    return this.store.listByUser(userId);
  }
}

export const sessionService = new SessionService();
