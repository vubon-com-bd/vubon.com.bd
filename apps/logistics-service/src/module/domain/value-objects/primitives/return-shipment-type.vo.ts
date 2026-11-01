/**
 * ReturnShipmentType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RETURN_SHIPMENT_TYPE } from '@vubon/shared-constants/logistics';

export type ReturnShipmentTypeValue =
  (typeof RETURN_SHIPMENT_TYPE)[keyof typeof RETURN_SHIPMENT_TYPE];

const VALID_TYPES: readonly string[] = Object.values(RETURN_SHIPMENT_TYPE);

export class ReturnShipmentTypeVO extends BaseVO<ReturnShipmentTypeValue> {
  private constructor(value: ReturnShipmentTypeValue) {
    super(value);
  }

  static create(raw: string): ReturnShipmentTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReturnShipmentType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ReturnShipmentType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new ReturnShipmentTypeVO(normalized as ReturnShipmentTypeValue);
  }

  static reconstitute(raw: string): ReturnShipmentTypeVO {
    return new ReturnShipmentTypeVO(raw as ReturnShipmentTypeValue);
  }

  isCustomerReturn(): boolean { return this.value === RETURN_SHIPMENT_TYPE.CUSTOMER_RETURN; }
  isRTO(): boolean { return this.value === RETURN_SHIPMENT_TYPE.RTO; }
  isExchange(): boolean { return this.value === RETURN_SHIPMENT_TYPE.EXCHANGE; }
  isWarranty(): boolean { return this.value === RETURN_SHIPMENT_TYPE.WARRANTY; }
  isDamaged(): boolean { return this.value === RETURN_SHIPMENT_TYPE.DAMAGED; }
  isWrongItem(): boolean { return this.value === RETURN_SHIPMENT_TYPE.WRONG_ITEM; }
  isRefused(): boolean { return this.value === RETURN_SHIPMENT_TYPE.REFUSED; }

  isRefundable(): boolean {
    return (
      this.isCustomerReturn() ||
      this.isRTO() ||
      this.isDamaged() ||
      this.isWrongItem() ||
      this.isRefused()
    );
  }
}
