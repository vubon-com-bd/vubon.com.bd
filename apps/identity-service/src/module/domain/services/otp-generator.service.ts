/**
 * OtpGeneratorService
 * @module identity-service/domain/services
 */
import { OTP } from '@vubon/shared-constants/security';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class OtpGeneratorService {
  static length(): number {
    return OTP.LENGTH;
  }

  static expirySeconds(): number {
    return OTP.EXPIRY_SECONDS;
  }

  static resendCooldownSeconds(): number {
    return OTP.RESEND_COOLDOWN_SECONDS;
  }

  static maxAttempts(): number {
    return OTP.MAX_ATTEMPTS;
  }

  static maxResend(): number {
    return OTP.MAX_RESEND;
  }

  /**
   * Generate numeric OTP of fixed length.
   * NOTE: Math.random for domain purity; infra can override with crypto.
   */
  static generate(length = this.length()): string {
    if (length < 4 || length > 8) {
      throw new ValidationError('OTP length must be 4-8', 'length');
    }
    let out = '';
    for (let i = 0; i < length; i++) {
      out += Math.floor(Math.random() * 10).toString();
    }
    // Ensure leading digit non-zero
    if (out[0] === '0') {
      out = '1' + out.slice(1);
    }
    return out;
  }

  static expiresAt(nowMs: number = Date.now()): Date {
    return new Date(nowMs + this.expirySeconds() * 1000);
  }

  static canResend(resendCount: number): boolean {
    return resendCount < this.maxResend();
  }

  static cooldownRemainingSeconds(
    lastSentAtMs: number,
    nowMs: number = Date.now(),
  ): number {
    const elapsed = Math.floor((nowMs - lastSentAtMs) / 1000);
    return Math.max(0, this.resendCooldownSeconds() - elapsed);
  }
}
