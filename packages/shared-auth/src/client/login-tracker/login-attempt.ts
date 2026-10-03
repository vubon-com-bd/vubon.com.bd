import type { LoginAttemptRecord, LoginTrackerOptions } from './login-attempt.types';

export const DEFAULT_LOGIN_TRACKER_OPTIONS: LoginTrackerOptions = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 min
  lockMs: 30 * 60 * 1000, // 30 min
};

/** In-memory login-attempt tracker (client hint only). */
export class LoginAttemptTracker {
  private readonly records = new Map<string, LoginAttemptRecord>();

  constructor(private readonly options: LoginTrackerOptions = DEFAULT_LOGIN_TRACKER_OPTIONS) {}

  private key(identifier: string): string {
    return identifier.trim().toLowerCase();
  }

  recordFailure(identifier: string): LoginAttemptRecord {
    const key = this.key(identifier);
    const now = Date.now();
    const existing = this.records.get(key);

    const inWindow =
      existing !== undefined && now - existing.lastAttemptAt <= this.options.windowMs;

    const attempts = inWindow ? existing.attempts + 1 : 1;
    const lockedUntil =
      attempts >= this.options.maxAttempts ? now + this.options.lockMs : undefined;

    const record: LoginAttemptRecord = {
      identifier,
      attempts,
      lastAttemptAt: now,
      lockedUntil,
    };
    this.records.set(key, record);
    return record;
  }

  recordSuccess(identifier: string): void {
    this.records.delete(this.key(identifier));
  }

  isLocked(identifier: string): boolean {
    const rec = this.records.get(this.key(identifier));
    if (!rec || rec.lockedUntil === undefined) return false;
    if (rec.lockedUntil <= Date.now()) {
      this.records.delete(this.key(identifier));
      return false;
    }
    return true;
  }

  clear(identifier?: string): void {
    if (identifier) this.records.delete(this.key(identifier));
    else this.records.clear();
  }
}
