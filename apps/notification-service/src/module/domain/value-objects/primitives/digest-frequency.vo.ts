/**
 * DigestFrequency Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DIGEST_FREQUENCY } from '@vubon/shared-constants/platform/notification';
import { InvalidDigestFrequencyError } from '../../errors/schedule.errors.js';

type DigestFrequencyValue =
  (typeof NOTIFICATION_DIGEST_FREQUENCY)[keyof typeof NOTIFICATION_DIGEST_FREQUENCY];
const ALLOWED = Object.values(NOTIFICATION_DIGEST_FREQUENCY) as readonly string[];

export class DigestFrequencyVO extends BaseTypeVO<DigestFrequencyValue> {
  private constructor(value: DigestFrequencyValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): DigestFrequencyVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidDigestFrequencyError(raw, ALLOWED);
    }
    return new DigestFrequencyVO(raw as DigestFrequencyValue);
  }

  static reconstitute(raw: string): DigestFrequencyVO {
    return new DigestFrequencyVO(raw as DigestFrequencyValue);
  }

  static hourly(): DigestFrequencyVO { return new DigestFrequencyVO(NOTIFICATION_DIGEST_FREQUENCY.HOURLY); }
  static daily(): DigestFrequencyVO { return new DigestFrequencyVO(NOTIFICATION_DIGEST_FREQUENCY.DAILY); }
  static weekly(): DigestFrequencyVO { return new DigestFrequencyVO(NOTIFICATION_DIGEST_FREQUENCY.WEEKLY); }
  static biweekly(): DigestFrequencyVO { return new DigestFrequencyVO(NOTIFICATION_DIGEST_FREQUENCY.BIWEEKLY); }
  static monthly(): DigestFrequencyVO { return new DigestFrequencyVO(NOTIFICATION_DIGEST_FREQUENCY.MONTHLY); }

  isHourly(): boolean { return this.value === NOTIFICATION_DIGEST_FREQUENCY.HOURLY; }
  isDaily(): boolean { return this.value === NOTIFICATION_DIGEST_FREQUENCY.DAILY; }
  isWeekly(): boolean { return this.value === NOTIFICATION_DIGEST_FREQUENCY.WEEKLY; }
  isMonthly(): boolean { return this.value === NOTIFICATION_DIGEST_FREQUENCY.MONTHLY; }

  intervalSeconds(): number {
    switch (this.value) {
      case NOTIFICATION_DIGEST_FREQUENCY.HOURLY: return 3600;
      case NOTIFICATION_DIGEST_FREQUENCY.DAILY: return 86400;
      case NOTIFICATION_DIGEST_FREQUENCY.WEEKLY: return 604800;
      case NOTIFICATION_DIGEST_FREQUENCY.BIWEEKLY: return 1209600;
      case NOTIFICATION_DIGEST_FREQUENCY.MONTHLY: return 2592000;
      default: return 86400;
    }
  }
}
