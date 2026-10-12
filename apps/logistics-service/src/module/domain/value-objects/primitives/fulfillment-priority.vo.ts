/**
 * FulfillmentPriority Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FULFILLMENT_PRIORITY } from '@vubon/shared-constants/logistics';
import { InvalidFulfillmentPriorityError } from '../../errors/fulfillment.errors.js';

const ALLOWED = Object.values(FULFILLMENT_PRIORITY) as readonly string[];

export class FulfillmentPriorityVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): FulfillmentPriorityVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidFulfillmentPriorityError(String(raw));
    }
    return new FulfillmentPriorityVO(raw);
  }

  static reconstitute(raw: string): FulfillmentPriorityVO { return new FulfillmentPriorityVO(raw); }

  static low(): FulfillmentPriorityVO { return new FulfillmentPriorityVO(FULFILLMENT_PRIORITY.LOW); }
  static normal(): FulfillmentPriorityVO { return new FulfillmentPriorityVO(FULFILLMENT_PRIORITY.NORMAL); }
  static high(): FulfillmentPriorityVO { return new FulfillmentPriorityVO(FULFILLMENT_PRIORITY.HIGH); }
  static urgent(): FulfillmentPriorityVO { return new FulfillmentPriorityVO(FULFILLMENT_PRIORITY.URGENT); }

  isLow(): boolean { return this.value === FULFILLMENT_PRIORITY.LOW; }
  isNormal(): boolean { return this.value === FULFILLMENT_PRIORITY.NORMAL; }
  isHigh(): boolean { return this.value === FULFILLMENT_PRIORITY.HIGH; }
  isUrgent(): boolean { return this.value === FULFILLMENT_PRIORITY.URGENT; }

  /** Skip normal queue. */
  isElevated(): boolean { return this.isHigh() || this.isUrgent(); }

  get rank(): number {
    const ranks: Record<string, number> = {
      [FULFILLMENT_PRIORITY.LOW]: 0,
      [FULFILLMENT_PRIORITY.NORMAL]: 1,
      [FULFILLMENT_PRIORITY.HIGH]: 2,
      [FULFILLMENT_PRIORITY.URGENT]: 3,
    };
    return ranks[this.value] ?? 1;
  }
}
