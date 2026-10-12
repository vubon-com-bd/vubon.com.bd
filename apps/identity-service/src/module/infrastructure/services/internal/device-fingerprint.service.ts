/**
 * DeviceFingerprintService — deterministic device fingerprint hashing
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { createHash, timingSafeEqual } from 'node:crypto';

export interface FingerprintInput {
  readonly userAgent?: string;
  readonly acceptLanguage?: string;
  readonly ip?: string;
  readonly platform?: string;
  readonly screenResolution?: string;
}

@Injectable()
export class DeviceFingerprintService {
  compute(input: FingerprintInput): string {
    const parts = [
      input.userAgent ?? '',
      input.acceptLanguage ?? '',
      input.platform ?? '',
      input.screenResolution ?? '',
    ];
    return createHash('sha256').update(parts.join('|')).digest('hex');
  }

  matches(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    try {
      return timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
    } catch {
      return false;
    }
  }

  isValid(fp: string): boolean {
    return /^[a-f0-9]{64}$/i.test(fp);
  }
}
