/**
 * DigestStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DIGEST_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidDigestStatusError } from '../../errors/schedule.errors.js';

const ALLOWED = Object.values(NOTIFICATION_DIGEST_STATUS) as readonly string[];

export class DigestStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DigestStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidDigestStatusError(raw, ALLOWED);
    }
    return new DigestStatusVO(raw);
  }

  static reconstitute(raw: string): DigestStatusVO {
    return new DigestStatusVO(raw);
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

  isFinal(): boolean {
    return this.isSent() || this.isFailed() || this.isCancelled();
  }

  canBeSent(): boolean {
    return this.isReady();
  }
}
