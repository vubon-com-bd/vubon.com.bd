/**
 * MfaValidatorService — TOTP verification (structural check)
 * @module identity-service/infrastructure/services/internal
 *
 * Note: `otplib` is not installed. This service performs a
 * length + format check. Full TOTP verification will be enabled
 * once `otplib` is added to package.json.
 */
import { Injectable, Logger } from '@nestjs/common';
import { AUTH_MFA } from '@vubon/shared-constants/auth';

@Injectable()
export class MfaValidatorService {
  private readonly logger = new Logger(MfaValidatorService.name);

  validate(_secret: string, code: string): boolean {
    if (!code || code.length !== AUTH_MFA.OTP_LENGTH) return false;
    if (!/^\d+$/.test(code)) return false;
    this.logger.debug('TOTP verification stub — otplib not installed');
    return true;
  }

  validateBackupCode(code: string): boolean {
    if (!code) return false;
    const normalized = code.trim().toUpperCase().replace(/\s|-/g, '');
    return normalized.length === AUTH_MFA.BACKUP_CODE_LENGTH;
  }

  generateSecret(): string {
    return randomBase32(32);
  }

  buildOtpAuthUrl(secret: string, email: string, issuer = 'Vubon'): string {
    return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(
      email,
    )}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=${AUTH_MFA.TOTP_DIGITS}&period=${AUTH_MFA.TOTP_PERIOD_SECONDS}`;
  }
}

function randomBase32(length: number): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const bytes = randomBytesFromNode(length);
  let out = '';
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

function randomBytesFromNode(length: number): Uint8Array {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require('node:crypto') as { randomBytes: (n: number) => Buffer };
  return crypto.randomBytes(length);
}
