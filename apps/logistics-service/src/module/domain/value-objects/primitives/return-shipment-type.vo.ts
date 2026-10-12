/**
 * ReturnShipmentType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RETURN_SHIPMENT_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidReturnShipmentTypeError } from '../../errors/return-shipment.errors.js';

const ALLOWED = Object.values(RETURN_SHIPMENT_TYPE) as readonly string[];

export class ReturnShipmentTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ReturnShipmentTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidReturnShipmentTypeError(String(raw));
    }
    return new ReturnShipmentTypeVO(raw);
  }

  static reconstitute(raw: string): ReturnShipmentTypeVO { return new ReturnShipmentTypeVO(raw); }

  static customerReturn(): ReturnShipmentTypeVO { return new ReturnShipmentTypeVO(RETURN_SHIPMENT_TYPE.CUSTOMER_RETURN); }
  static rto(): ReturnShipmentTypeVO { return new ReturnShipmentTypeVO(RETURN_SHIPMENT_TYPE.RTO); }
  static exchange(): ReturnShipmentTypeVO { return new ReturnShipmentTypeVO(RETURN_SHIPMENT_TYPE.EXCHANGE); }
  static warranty(): ReturnShipmentTypeVO { return new ReturnShipmentTypeVO(RETURN_SHIPMENT_TYPE.WARRANTY); }
  static damaged(): ReturnShipmentTypeVO { return new ReturnShipmentTypeVO(RETURN_SHIPMENT_TYPE.DAMAGED); }
  static wrongItem(): ReturnShipmentTypeVO { return new ReturnShipmentTypeVO(RETURN_SHIPMENT_TYPE.WRONG_ITEM); }
  static refused(): ReturnShipmentTypeVO { return new ReturnShipmentTypeVO(RETURN_SHIPMENT_TYPE.REFUSED); }

  isCustomerReturn(): boolean { return this.value === RETURN_SHIPMENT_TYPE.CUSTOMER_RETURN; }
  isRto(): boolean { return this.value === RETURN_SHIPMENT_TYPE.RTO; }
  isExchange(): boolean { return this.value === RETURN_SHIPMENT_TYPE.EXCHANGE; }
  isWarranty(): boolean { return this.value === RETURN_SHIPMENT_TYPE.WARRANTY; }
  isDamaged(): boolean { return this.value === RETURN_SHIPMENT_TYPE.DAMAGED; }
  isWrongItem(): boolean { return this.value === RETURN_SHIPMENT_TYPE.WRONG_ITEM; }
  isRefused(): boolean { return this.value === RETURN_SHIPMENT_TYPE.REFUSED; }

  /** Seller/platform caused. */
  isOurFault(): boolean { return this.isWrongItem() || this.isDamaged(); }

  /** Customer refused on delivery. */
  isCustomerRefused(): boolean { return this.isRto() || this.isRefused(); }

  /** Customer wants another item instead. */
  isSwap(): boolean { return this.isExchange() || this.isWarranty(); }

  /** Requires refund processing. */
  requiresRefund(): boolean {
    return !this.isExchange();
  }
}
