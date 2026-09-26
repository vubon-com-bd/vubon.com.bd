/**
 * RecoveryCodeGeneratorService — generates & hashes recovery codes
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { randomBytes, randomInt, createHash, timingSafeEqual } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import type { RecoveryCodeGeneratorServiceInterface } from '../../../application/services/interfaces/recovery-code-generator.service.interface';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I
const BLOCK = 4;
const BLOCKS = 2;
const BCRYPT_ROUNDS = 10;

@Injectable()
export class RecoveryCodeGeneratorService
  implements RecoveryCodeGeneratorServiceInterface {
  readonly name = 'RecoveryCodeGeneratorService';

  async generate(count: number): Promise<readonly string[]> {
    const set = new Set<string>();
    while (set.size < count) {
      set.add(RecoveryCodeGeneratorService.randomCode());
    }
    return Array.from(set);
  }

  async hash(code: string): Promise<string> {
    return bcrypt.hash(
      RecoveryCodeGeneratorService.normalize(code),
      BCRYPT_ROUNDS,
    );
  }

  async verify(code: string, hash: string): Promise<boolean> {
    if (!code || !hash) return false;
    try {
      return await bcrypt.compare(
        RecoveryCodeGeneratorService.normalize(code),
        hash,
      );
    } catch {
      return false;
    }
  }

  // ---------- internals ----------

  private static randomCode(): string {
    const groups: string[] = [];
    for (let g = 0; g < BLOCKS; g += 1) {
      let block = '';
      for (let i = 0; i < BLOCK; i += 1) {
        // randomInt is cryptographically secure AND unbiased
        block += ALPHABET[randomInt(0, ALPHABET.length)];
      }
      groups.push(block);
    }
    return groups.join('-');
  }

  private static normalize(code: string): string {
    return code.trim().toUpperCase().replace(/\s/g, '');
  }

  /** Reserved — used by callers comparing timing-safe. */
  static constantTimeEquals(a: string, b: string): boolean {
    const ha = createHash('sha256').update(a).digest();
    const hb = createHash('sha256').update(b).digest();
    return timingSafeEqual(ha, hb);
  }
}
