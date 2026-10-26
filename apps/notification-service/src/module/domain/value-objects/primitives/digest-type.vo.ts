/**
 * DigestType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DIGEST_TYPE } from '@vubon/shared-constants/platform';
import { InvalidDigestTypeError } from '@domain/errors/digest.errors.js';

export type DigestTypeValue =
  (typeof NOTIFICATION_DIGEST_TYPE)[keyof typeof NOTIFICATION_DIGEST_TYPE];

const ALLOWED = Object.values(NOTIFICATION_DIGEST_TYPE) as readonly string[];

export class DigestTypeVO extends BaseTypeVO<DigestTypeValue> {
  private constructor(value: DigestTypeValue) {
    super(value);
  }

  static create(raw: string): DigestTypeVO {
    if (typeof raw !== 'string') {
      throw new InvalidDigestTypeError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidDigestTypeError(normalized, ALLOWED);
    }
    return new DigestTypeVO(normalized as DigestTypeValue);
  }

  static reconstitute(raw: string): DigestTypeVO {
    return new DigestTypeVO(raw as DigestTypeValue);
  }

  isDetailed(): boolean {
    return this.value === NOTIFICATION_DIGEST_TYPE.DETAILED;
  }

  groupsByCategory(): boolean {
    return this.value === NOTIFICATION_DIGEST_TYPE.CATEGORIZED;
  }
}
