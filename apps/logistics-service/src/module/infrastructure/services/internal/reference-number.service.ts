/**
 * ReferenceNumberService — Generates prefixed reference numbers
 * @module logistics-service/infrastructure/services/internal
 *
 * Format: PREFIX + timestamp (base36) + random suffix
 * Example: RMA-1793515224-A7  (RMA / DSP / INV / RTS)
 */
import { Injectable } from '@nestjs/common';

export type ReferencePrefix = 'RMA' | 'DSP' | 'INV' | 'RTS' | 'DSP' | 'INS';

const RANDOM_SUFFIX_LENGTH = 4;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

@Injectable()
export class ReferenceNumberService {
  /**
   * Generate a reference number like `RMA-1793515224-ABCD`.
   * ⚠️ Not cryptographically random — for display/reference only.
   */
  generate(prefix: ReferencePrefix, now?: Date): string {
    const timestamp = Math.floor((now?.getTime() ?? Date.now()) / 1000);
    const suffix = this.randomSuffix(RANDOM_SUFFIX_LENGTH);
    return `${prefix}-${timestamp}-${suffix}`;
  }

  /**
   * Generate + verify non-collision using the provided check.
   * Retries up to 5 times.
   */
  async generateUnique(
    prefix: ReferencePrefix,
    existsFn: (candidate: string) => Promise<boolean>,
    now?: Date,
  ): Promise<string> {
    const MAX_ATTEMPTS = 5;
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const candidate = this.generate(prefix, now);
      if (!(await existsFn(candidate))) return candidate;
    }
    throw new Error(`ReferenceNumberService: failed to generate unique ${prefix} after ${MAX_ATTEMPTS} attempts`);
  }

  private randomSuffix(length: number): string {
    let out = '';
    for (let i = 0; i < length; i++) {
      out += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return out;
  }
}
