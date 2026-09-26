/**
 * DeviceFingerprintService — Deterministic fingerprint from request signals
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';

@Injectable()
export class DeviceFingerprintService {
  readonly name = 'DeviceFingerprintService';

  fingerprint(input: {
    userAgent: string;
    ip: string;
    acceptLanguage?: string;
    acceptEncoding?: string;
  }): string {
    const payload = [
      input.userAgent,
      input.ip,
      input.acceptLanguage ?? '',
      input.acceptEncoding ?? '',
    ].join('|');
    return createHash('sha256').update(payload).digest('hex');
  }
}
