import type { SessionInfo } from '../../common/session/session.types';
import type { SessionStore } from './session-store.interface';

/**
 * Redis session store stub.
 * Wire your actual Redis client (ioredis / node-redis) here.
 */
export interface RedisLike {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode: string, ttlSeconds: number): Promise<unknown>;
  del(key: string): Promise<unknown>;
  keys(pattern: string): Promise<readonly string[]>;
}

export class RedisSessionStore implements SessionStore {
  constructor(
    private readonly redis: RedisLike,
    private readonly prefix = 'sess:'
  ) {}

  private key(id: string): string {
    return `${this.prefix}${id}`;
  }

  async get(sessionId: string): Promise<SessionInfo | null> {
    const raw = await this.redis.get(this.key(sessionId));
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SessionInfo;
    } catch {
      return null;
    }
  }

  async set(session: SessionInfo): Promise<void> {
    const ttl = Math.max(
      Math.floor((new Date(session.expiresAt).getTime() - Date.now()) / 1000),
      1
    );
    await this.redis.set(this.key(session.sessionId), JSON.stringify(session), 'EX', ttl);
  }

  async delete(sessionId: string): Promise<void> {
    await this.redis.del(this.key(sessionId));
  }

  async listByUser(userId: string): Promise<readonly SessionInfo[]> {
    const keys = await this.redis.keys(`${this.prefix}*`);
    const out: SessionInfo[] = [];
    for (const k of keys) {
      const raw = await this.redis.get(k);
      if (!raw) continue;
      try {
        const s = JSON.parse(raw) as SessionInfo;
        if (s.userId === userId) out.push(s);
      } catch {
        // skip corrupt
      }
    }
    return out;
  }

  async deleteByUser(userId: string): Promise<void> {
    const sessions = await this.listByUser(userId);
    for (const s of sessions) await this.delete(s.sessionId);
  }
}
