/**
 * InviteExpiry Value Object — ISO timestamp + business rules
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_TEAM } from '@vubon/shared-constants/business';

export class InviteExpiryVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InviteExpiryVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Invite expiry must be an ISO timestamp string', 'expiresAt');
    }
    const trimmed = raw.trim();
    const ts = Date.parse(trimmed);
    if (Number.isNaN(ts)) {
      throw new ValidationError('Invite expiry must be a valid ISO timestamp', 'expiresAt');
    }
    return new InviteExpiryVO(new Date(ts).toISOString());
  }

  static reconstitute(raw: string): InviteExpiryVO {
    return new InviteExpiryVO(raw);
  }

  /** Create an expiry N days from `from`. */
  static fromNow(days: number = VENDOR_TEAM.INVITE_EXPIRY_DAYS, from: Date = new Date()): InviteExpiryVO {
    if (!Number.isFinite(days) || days <= 0) {
      throw new ValidationError('Invite expiry days must be positive', 'expiresAt');
    }
    const at = new Date(from.getTime() + days * 24 * 60 * 60 * 1000);
    return new InviteExpiryVO(at.toISOString());
  }

  /** Default policy: 7 days (VENDOR_TEAM.INVITE_EXPIRY_DAYS). */
  static defaultExpiry(): InviteExpiryVO {
    return InviteExpiryVO.fromNow(VENDOR_TEAM.INVITE_EXPIRY_DAYS);
  }

  isExpired(at: Date = new Date()): boolean {
    return at.getTime() > Date.parse(this.value);
  }

  isActive(at: Date = new Date()): boolean {
    return !this.isExpired(at);
  }

  /** Whole hours remaining (0 if expired). */
  hoursRemaining(at: Date = new Date()): number {
    const diff = Date.parse(this.value) - at.getTime();
    return diff <= 0 ? 0 : Math.floor(diff / (1000 * 60 * 60));
  }

  /** Whole days remaining (0 if expired). */
  daysRemaining(at: Date = new Date()): number {
    return Math.floor(this.hoursRemaining(at) / 24);
  }

  toDate(): Date {
    return new Date(this.value);
  }
}
