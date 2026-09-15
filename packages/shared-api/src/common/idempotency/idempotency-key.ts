import type { IdempotencyRecord } from './idempotency.types';

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24h

/** Generate a UUID v4-ish idempotency key. */
export function generateIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  // Fallback (non-crypto, still unique enough for idempotency)
  const rnd = () => Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${rnd()}-${rnd()}-${rnd()}`;
}

/** In-memory store to deduplicate in-flight + recent keys. */
export class IdempotencyStore {
  private readonly records = new Map<string, IdempotencyRecord>();

  has(key: string): boolean {
    const rec = this.records.get(key);
    if (!rec) return false;
    if (rec.expiresAt <= Date.now()) {
      this.records.delete(key);
      return false;
    }
    return true;
  }

  remember(key: string, ttlMs: number = DEFAULT_TTL_MS): void {
    const now = Date.now();
    this.records.set(key, {
      key,
      createdAt: now,
      expiresAt: now + ttlMs,
    });
  }

  forget(key: string): void {
    this.records.delete(key);
  }

  clear(): void {
    this.records.clear();
  }
}

export const idempotencyStore = new IdempotencyStore();
