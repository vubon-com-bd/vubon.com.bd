/**
 * FulfillmentType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FULFILLMENT_TYPE } from '@vubon/shared-constants/logistics';

export type FulfillmentTypeValue =
  (typeof FULFILLMENT_TYPE)[keyof typeof FULFILLMENT_TYPE];

const VALID_TYPES: readonly string[] = Object.values(FULFILLMENT_TYPE);

export class FulfillmentTypeVO extends BaseVO<FulfillmentTypeValue> {
  private constructor(value: FulfillmentTypeValue) {
    super(value);
  }

  static create(raw: string): FulfillmentTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('FulfillmentType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid FulfillmentType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new FulfillmentTypeVO(normalized as FulfillmentTypeValue);
  }

  static reconstitute(raw: string): FulfillmentTypeVO {
    return new FulfillmentTypeVO(raw as FulfillmentTypeValue);
  }

  isStandard(): boolean { return this.value === FULFILLMENT_TYPE.STANDARD; }
  isExpress(): boolean { return this.value === FULFILLMENT_TYPE.EXPRESS; }
  isSameDay(): boolean { return this.value === FULFILLMENT_TYPE.SAME_DAY; }
  isBackorder(): boolean { return this.value === FULFILLMENT_TYPE.BACKORDER; }
  isPreorder(): boolean { return this.value === FULFILLMENT_TYPE.PREORDER; }
  isDropship(): boolean { return this.value === FULFILLMENT_TYPE.DROPSHIP; }
  isCrossDock(): boolean { return this.value === FULFILLMENT_TYPE.CROSS_DOCK; }

  isFast(): boolean {
    return this.isExpress() || this.isSameDay();
  }
}
