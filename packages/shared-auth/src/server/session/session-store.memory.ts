import type { SessionInfo } from '../../common/session/session.types';
import type { SessionStore } from './session-store.interface';

/** In-memory session store. For dev / single-node only. */
export class MemorySessionStore implements SessionStore {
  private readonly map = new Map<string, SessionInfo>();

  async get(sessionId: string): Promise<SessionInfo | null> {
    return this.map.get(sessionId) ?? null;
  }

  async set(session: SessionInfo): Promise<void> {
    this.map.set(session.sessionId, session);
  }

  async delete(sessionId: string): Promise<void> {
    this.map.delete(sessionId);
  }

  async listByUser(userId: string): Promise<readonly SessionInfo[]> {
    return [...this.map.values()].filter((s) => s.userId === userId);
  }

  async deleteByUser(userId: string): Promise<void> {
    for (const [id, s] of this.map.entries()) {
      if (s.userId === userId) this.map.delete(id);
    }
  }
}
