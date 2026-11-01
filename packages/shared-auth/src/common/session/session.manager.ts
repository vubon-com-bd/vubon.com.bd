import type { SessionInfo } from './session.types';
import { validateSession } from './session.validator';

/**
 * Common session manager — platform-agnostic holder.
 * Client / server both can wrap this with their own storage.
 */
export class CommonSessionManager {
  private session: SessionInfo | null = null;

  get(): SessionInfo | null {
    return this.session;
  }

  set(session: SessionInfo | null): void {
    this.session = session;
  }

  isActive(idleTimeoutMs?: number): boolean {
    return validateSession(this.session, idleTimeoutMs).valid;
  }

  clear(): void {
    this.session = null;
  }
}
