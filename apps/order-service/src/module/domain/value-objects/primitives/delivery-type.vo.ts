/**
 * DeliveryType Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { DELIVERY_TYPE } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(DELIVERY_TYPE) as readonly string[];

export class DeliveryTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid delivery type "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'deliveryType',
      );
    }
    return new DeliveryTypeVO(raw);
  }

  static reconstitute(raw: string): DeliveryTypeVO { return new DeliveryTypeVO(raw); }

  isExpress(): boolean {
    return ['express', 'same_day'].includes(this.value);
  }

  isPickup(): boolean { return this.value === 'pickup'; }
  isDigital(): boolean { return this.value === 'digital'; }
}
