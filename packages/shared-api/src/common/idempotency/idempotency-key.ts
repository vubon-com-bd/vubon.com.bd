import type { IdempotencyRecord } from './idempotency.types';

const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24h

/**
 * Generate a cryptographically secure idempotency key.
 * No Math.random fallback — throws if Web Crypto is unavailable.
 */
export function generateIdempotencyKey(): string {
  const c = globalThis.crypto as Crypto | undefined;
  if (!c) {
    throw new Error('Web Crypto unavailable — cannot generate secure idempotency key');
  }
  if (typeof c.randomUUID === 'function') return c.randomUUID();
  const bytes = new Uint8Array(16);
  c.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
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
    this.records.set(key, { key, createdAt: now, expiresAt: now + ttlMs });
  }

  forget(key: string): void {
    this.records.delete(key);
  }

  clear(): void {
    this.records.clear();
  }
}

export const idempotencyStore = new IdempotencyStore();
