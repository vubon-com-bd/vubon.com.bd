import { createHash } from 'node:crypto';

export class IdempotencyService {
  /**
   * Deterministically derive a key from a payload.
   */
  deriveKey(payload: Readonly<Record<string, unknown>>): string {
    const canonical = JSON.stringify(payload, Object.keys(payload).sort());
    return createHash('sha256').update(canonical).digest('hex');
  }

  isValidKey(key: string): boolean {
    return typeof key === 'string' && key.length >= 8 && key.length <= 128;
  }
}
