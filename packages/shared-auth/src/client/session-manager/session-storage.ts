import type { SessionInfo } from '../../common/session/session.types';

/**
 * Holds current session in memory.
 * ⚠️ Not persisted. Session state MUST be fetched from server on boot.
 */
export class SessionMemoryStore {
  private session: SessionInfo | null = null;

  get(): SessionInfo | null {
    return this.session;
  }

  set(session: SessionInfo | null): void {
    this.session = session;
  }

  clear(): void {
    this.session = null;
  }
}
