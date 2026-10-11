/**
 * DigestType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DIGEST_TYPE } from '@vubon/shared-constants/platform/notification';
import { InvalidDigestTypeError } from '../../errors/schedule.errors.js';

type DigestTypeValue = (typeof NOTIFICATION_DIGEST_TYPE)[keyof typeof NOTIFICATION_DIGEST_TYPE];
const ALLOWED = Object.values(NOTIFICATION_DIGEST_TYPE) as readonly string[];

export class DigestTypeVO extends BaseTypeVO<DigestTypeValue> {
  private constructor(value: DigestTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): DigestTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidDigestTypeError(raw, ALLOWED);
    }
    return new DigestTypeVO(raw as DigestTypeValue);
  }

  static reconstitute(raw: string): DigestTypeVO {
    return new DigestTypeVO(raw as DigestTypeValue);
  }

  static summary(): DigestTypeVO { return new DigestTypeVO(NOTIFICATION_DIGEST_TYPE.SUMMARY); }
  static detailed(): DigestTypeVO { return new DigestTypeVO(NOTIFICATION_DIGEST_TYPE.DETAILED); }
  static categorized(): DigestTypeVO { return new DigestTypeVO(NOTIFICATION_DIGEST_TYPE.CATEGORIZED); }
  static priorityBased(): DigestTypeVO { return new DigestTypeVO(NOTIFICATION_DIGEST_TYPE.PRIORITY_BASED); }
}
