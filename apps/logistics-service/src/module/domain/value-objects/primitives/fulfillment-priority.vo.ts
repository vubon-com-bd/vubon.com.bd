/**
 * FulfillmentPriority Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FULFILLMENT_PRIORITY } from '@vubon/shared-constants/logistics';

export type FulfillmentPriorityValue =
  (typeof FULFILLMENT_PRIORITY)[keyof typeof FULFILLMENT_PRIORITY];

const VALID_PRIORITIES: readonly string[] = Object.values(FULFILLMENT_PRIORITY);

const RANK: Readonly<Record<FulfillmentPriorityValue, number>> = {
  low: 1,
  normal: 2,
  high: 3,
  urgent: 4,
};

export class FulfillmentPriorityVO extends BaseVO<FulfillmentPriorityValue> {
  private constructor(value: FulfillmentPriorityValue) {
    super(value);
  }

  static create(raw: string): FulfillmentPriorityVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('FulfillmentPriority must be a string', 'priority');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PRIORITIES.includes(normalized)) {
      throw new ValidationError(
        `Invalid FulfillmentPriority: "${normalized}". Allowed: ${VALID_PRIORITIES.join(', ')}`,
        'priority',
      );
    }
    return new FulfillmentPriorityVO(normalized as FulfillmentPriorityValue);
  }

  static reconstitute(raw: string): FulfillmentPriorityVO {
    return new FulfillmentPriorityVO(raw as FulfillmentPriorityValue);
  }

  isLow(): boolean { return this.value === FULFILLMENT_PRIORITY.LOW; }
  isNormal(): boolean { return this.value === FULFILLMENT_PRIORITY.NORMAL; }
  isHigh(): boolean { return this.value === FULFILLMENT_PRIORITY.HIGH; }
  isUrgent(): boolean { return this.value === FULFILLMENT_PRIORITY.URGENT; }

  isAtLeast(other: FulfillmentPriorityVO): boolean {
    return RANK[this.value] >= RANK[other.value];
  }

  get rank(): number {
    return RANK[this.value];
  }
}
