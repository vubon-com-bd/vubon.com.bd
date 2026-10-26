/**
 * DigestStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DIGEST_STATUS } from '@vubon/shared-constants/platform';
import { InvalidDigestStatusError } from '@domain/errors/digest.errors.js';

export type DigestStatusValue =
  (typeof NOTIFICATION_DIGEST_STATUS)[keyof typeof NOTIFICATION_DIGEST_STATUS];

const ALLOWED = Object.values(NOTIFICATION_DIGEST_STATUS) as readonly string[];

const VALID_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  pending: ['generating', 'cancelled'],
  generating: ['ready', 'failed'],
  ready: ['sent', 'cancelled'],
  sent: [],
  failed: ['pending', 'cancelled'],
  cancelled: [],
};

export class DigestStatusVO extends BaseStatusVO<DigestStatusValue> {
  private constructor(value: DigestStatusValue) {
    super(value);
  }

  static create(raw: string): DigestStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidDigestStatusError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidDigestStatusError(normalized, ALLOWED);
    }
    return new DigestStatusVO(normalized as DigestStatusValue);
  }

  static reconstitute(raw: string): DigestStatusVO {
    return new DigestStatusVO(raw as DigestStatusValue);
  }

  static pending(): DigestStatusVO { return new DigestStatusVO(NOTIFICATION_DIGEST_STATUS.PENDING); }
  static generating(): DigestStatusVO { return new DigestStatusVO(NOTIFICATION_DIGEST_STATUS.GENERATING); }
  static ready(): DigestStatusVO { return new DigestStatusVO(NOTIFICATION_DIGEST_STATUS.READY); }
  static sent(): DigestStatusVO { return new DigestStatusVO(NOTIFICATION_DIGEST_STATUS.SENT); }
  static failed(): DigestStatusVO { return new DigestStatusVO(NOTIFICATION_DIGEST_STATUS.FAILED); }
  static cancelled(): DigestStatusVO { return new DigestStatusVO(NOTIFICATION_DIGEST_STATUS.CANCELLED); }

  isPending(): boolean { return this.value === NOTIFICATION_DIGEST_STATUS.PENDING; }
  isGenerating(): boolean { return this.value === NOTIFICATION_DIGEST_STATUS.GENERATING; }
  isReady(): boolean { return this.value === NOTIFICATION_DIGEST_STATUS.READY; }
  isSent(): boolean { return this.value === NOTIFICATION_DIGEST_STATUS.SENT; }
  isFailed(): boolean { return this.value === NOTIFICATION_DIGEST_STATUS.FAILED; }
  isCancelled(): boolean { return this.value === NOTIFICATION_DIGEST_STATUS.CANCELLED; }

  isTerminal(): boolean { return this.isSent() || this.isCancelled(); }
  canBeSent(): boolean { return this.isReady(); }

  canTransitionTo(target: string): boolean {
    return (VALID_TRANSITIONS[this.value] ?? []).includes(target);
  }
}
