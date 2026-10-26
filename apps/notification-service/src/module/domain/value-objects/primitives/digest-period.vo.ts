/**
 * DigestPeriod Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { NOTIFICATION_DIGEST_FREQUENCY } from '@vubon/shared-constants/platform';
import { InvalidDigestPeriodError } from '@domain/errors/digest.errors.js';

export type DigestFrequencyValue =
  (typeof NOTIFICATION_DIGEST_FREQUENCY)[keyof typeof NOTIFICATION_DIGEST_FREQUENCY];

const ALLOWED = Object.values(NOTIFICATION_DIGEST_FREQUENCY) as readonly string[];

export interface DigestPeriodProps {
  readonly frequency: DigestFrequencyValue;
  readonly periodStart: string;
  readonly periodEnd: string;
}

export class DigestPeriodVO extends BaseVO<DigestPeriodProps> {
  private constructor(value: DigestPeriodProps) {
    super(value);
  }

  static create(props: DigestPeriodProps): DigestPeriodVO {
    if (!ALLOWED.includes(props.frequency)) {
      throw new InvalidDigestPeriodError(`invalid frequency "${props.frequency}"`);
    }
    const start = new Date(props.periodStart);
    const end = new Date(props.periodEnd);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new InvalidDigestPeriodError('invalid ISO timestamps');
    }
    if (start.getTime() >= end.getTime()) {
      throw new InvalidDigestPeriodError('periodStart must be before periodEnd');
    }
    return new DigestPeriodVO({
      frequency: props.frequency,
      periodStart: start.toISOString(),
      periodEnd: end.toISOString(),
    });
  }

  static reconstitute(props: DigestPeriodProps): DigestPeriodVO {
    return new DigestPeriodVO(props);
  }

  get frequency(): DigestFrequencyValue { return this.value.frequency; }
  get periodStart(): string { return this.value.periodStart; }
  get periodEnd(): string { return this.value.periodEnd; }

  get durationMs(): number {
    return new Date(this.value.periodEnd).getTime() - new Date(this.value.periodStart).getTime();
  }

  get durationDays(): number {
    return this.durationMs / (24 * 60 * 60 * 1000);
  }
}
