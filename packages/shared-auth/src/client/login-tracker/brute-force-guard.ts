import { AccountLockedError } from '../../common/errors/account-locked-error';
import { LoginAttemptTracker } from './login-attempt';
import type { LoginTrackerOptions } from './login-attempt.types';

/**
 * Client-side brute-force guard (UI hint only).
 * ⚠️ Server MUST also rate-limit + lock. This is just UX.
 */
export class BruteForceGuard {
  private readonly tracker: LoginAttemptTracker;

  constructor(options?: LoginTrackerOptions) {
    this.tracker = new LoginAttemptTracker(options);
  }

  assertNotLocked(identifier: string): void {
    if (this.tracker.isLocked(identifier)) {
      throw new AccountLockedError({ identifier });
    }
  }

  onFailure(identifier: string): void {
    this.tracker.recordFailure(identifier);
  }

  onSuccess(identifier: string): void {
    this.tracker.recordSuccess(identifier);
  }

  isLocked(identifier: string): boolean {
    return this.tracker.isLocked(identifier);
  }

  reset(identifier?: string): void {
    this.tracker.clear(identifier);
  }
}
