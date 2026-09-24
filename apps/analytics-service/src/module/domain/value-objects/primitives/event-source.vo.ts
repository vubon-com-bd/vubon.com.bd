import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ANALYTICS_SOURCE } from '@vubon/shared-constants/platform/analytics';

const VALID_SOURCES = new Set<string>(Object.values(ANALYTICS_SOURCE));

export class EventSourceVO extends BaseTypeVO<string> {
  static create(raw: string): EventSourceVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_SOURCES.has(normalized)) {
      throw new Error(`Invalid event source: ${raw}`);
    }
    return new EventSourceVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isPaid(): boolean {
    return this.value === ANALYTICS_SOURCE.PAID ||
           this.value === ANALYTICS_SOURCE.DISPLAY ||
           this.value === ANALYTICS_SOURCE.AFFILIATE;
  }

  get isOrganic(): boolean {
    return this.value === ANALYTICS_SOURCE.ORGANIC ||
           this.value === ANALYTICS_SOURCE.REFERRAL;
  }

  get isDirect(): boolean {
    return this.value === ANALYTICS_SOURCE.DIRECT;
  }
}
