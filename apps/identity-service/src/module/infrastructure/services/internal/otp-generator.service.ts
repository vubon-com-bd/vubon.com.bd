/**
 * OtpGeneratorService — cryptographically random numeric OTP
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import { OTP } from '@vubon/shared-constants/security';

@Injectable()
export class OtpGeneratorService {
  generate(length: number = OTP.LENGTH): string {
    let out = '';
    for (let i = 0; i < length; i++) {
      out += randomInt(0, 10).toString();
    }
    if (out[0] === '0') {
      out = randomInt(1, 10).toString() + out.slice(1);
    }
    return out;
  }

  expiresAt(nowMs: number = Date.now()): Date {
    return new Date(nowMs + OTP.EXPIRY_SECONDS * 1000);
  }

  cooldownRemainingSeconds(
    lastSentAtMs: number,
    nowMs: number = Date.now(),
  ): number {
    const elapsed = Math.floor((nowMs - lastSentAtMs) / 1000);
    return Math.max(0, OTP.RESEND_COOLDOWN_SECONDS - elapsed);
  }

  length(): number {
    return OTP.LENGTH;
  }

  maxAttempts(): number {
    return OTP.MAX_ATTEMPTS;
  }
}
