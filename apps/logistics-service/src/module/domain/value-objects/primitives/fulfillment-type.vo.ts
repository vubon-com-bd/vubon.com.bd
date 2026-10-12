/**
 * FulfillmentType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FULFILLMENT_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidFulfillmentTypeError } from '../../errors/fulfillment.errors.js';

const ALLOWED = Object.values(FULFILLMENT_TYPE) as readonly string[];

export class FulfillmentTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): FulfillmentTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidFulfillmentTypeError(String(raw));
    }
    return new FulfillmentTypeVO(raw);
  }

  static reconstitute(raw: string): FulfillmentTypeVO { return new FulfillmentTypeVO(raw); }

  static standard(): FulfillmentTypeVO { return new FulfillmentTypeVO(FULFILLMENT_TYPE.STANDARD); }
  static express(): FulfillmentTypeVO { return new FulfillmentTypeVO(FULFILLMENT_TYPE.EXPRESS); }
  static sameDay(): FulfillmentTypeVO { return new FulfillmentTypeVO(FULFILLMENT_TYPE.SAME_DAY); }
  static backorder(): FulfillmentTypeVO { return new FulfillmentTypeVO(FULFILLMENT_TYPE.BACKORDER); }
  static preorder(): FulfillmentTypeVO { return new FulfillmentTypeVO(FULFILLMENT_TYPE.PREORDER); }
  static dropship(): FulfillmentTypeVO { return new FulfillmentTypeVO(FULFILLMENT_TYPE.DROPSHIP); }
  static crossDock(): FulfillmentTypeVO { return new FulfillmentTypeVO(FULFILLMENT_TYPE.CROSS_DOCK); }

  isStandard(): boolean { return this.value === FULFILLMENT_TYPE.STANDARD; }
  isExpress(): boolean { return this.value === FULFILLMENT_TYPE.EXPRESS; }
  isSameDay(): boolean { return this.value === FULFILLMENT_TYPE.SAME_DAY; }
  isBackorder(): boolean { return this.value === FULFILLMENT_TYPE.BACKORDER; }
  isPreorder(): boolean { return this.value === FULFILLMENT_TYPE.PREORDER; }
  isDropship(): boolean { return this.value === FULFILLMENT_TYPE.DROPSHIP; }
  isCrossDock(): boolean { return this.value === FULFILLMENT_TYPE.CROSS_DOCK; }

  /** Fast-track fulfillment (express / same-day). */
  isFastTrack(): boolean { return this.isExpress() || this.isSameDay(); }

  /** Cannot be fulfilled immediately. */
  isDeferred(): boolean { return this.isBackorder() || this.isPreorder(); }

  /** Vendor ships directly, bypassing our warehouse. */
  isVendorFulfilled(): boolean { return this.isDropship(); }
}
