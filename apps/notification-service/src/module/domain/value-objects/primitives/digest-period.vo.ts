import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DIGEST_FREQUENCY } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_DIGEST_FREQUENCY));

export class DigestPeriodVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): DigestPeriodVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid digest period: ${raw}`);
    }
    return new DigestPeriodVO(raw);
  }
}
