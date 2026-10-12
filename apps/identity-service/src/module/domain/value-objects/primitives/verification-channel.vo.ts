/**
 * VerificationChannel Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_VERIFICATION_CHANNEL } from '@vubon/shared-constants/auth';
import { InvalidVerificationChannelError } from '../../errors/verification.errors.js';

const VALID_CHANNELS: readonly string[] = Object.values(AUTH_VERIFICATION_CHANNEL);

export class VerificationChannelVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VerificationChannelVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidVerificationChannelError(String(raw), VALID_CHANNELS);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_CHANNELS.includes(normalized)) {
      throw new InvalidVerificationChannelError(normalized, VALID_CHANNELS);
    }
    return new VerificationChannelVO(normalized);
  }

  static email(): VerificationChannelVO { return new VerificationChannelVO(AUTH_VERIFICATION_CHANNEL.EMAIL); }
  static sms(): VerificationChannelVO { return new VerificationChannelVO(AUTH_VERIFICATION_CHANNEL.SMS); }
  static whatsapp(): VerificationChannelVO { return new VerificationChannelVO(AUTH_VERIFICATION_CHANNEL.WHATSAPP); }
  static push(): VerificationChannelVO { return new VerificationChannelVO(AUTH_VERIFICATION_CHANNEL.PUSH); }

  static reconstitute(raw: string): VerificationChannelVO {
    return new VerificationChannelVO(raw);
  }

  isEmail(): boolean { return this.value === AUTH_VERIFICATION_CHANNEL.EMAIL; }
  isSms(): boolean { return this.value === AUTH_VERIFICATION_CHANNEL.SMS; }
  isWhatsapp(): boolean { return this.value === AUTH_VERIFICATION_CHANNEL.WHATSAPP; }
  isPush(): boolean { return this.value === AUTH_VERIFICATION_CHANNEL.PUSH; }
}
