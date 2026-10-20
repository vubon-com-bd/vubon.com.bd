/**
 * DeliveryMethodVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeliveryMethodIdVO } from '../primitives/delivery-method-id.vo.js';
import { DeliveryMethodTypeVO } from '../primitives/delivery-method-type.vo.js';

export interface DeliveryMethodVOProps {
  readonly id: DeliveryMethodIdVO;
  readonly name: string;
  readonly type: DeliveryMethodTypeVO;
  readonly carrier?: string;
  readonly baseCost: number;
  readonly currency: string;
  readonly estimatedDays: number;
  readonly isActive: boolean;
}

export class DeliveryMethodVO extends BaseVO<DeliveryMethodVOProps> {
  private constructor(props: DeliveryMethodVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: DeliveryMethodVOProps): DeliveryMethodVO {
    const vo = new DeliveryMethodVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DeliveryMethodVOProps): DeliveryMethodVO {
    return new DeliveryMethodVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.name !== 'string' || v.name.trim().length === 0) {
      throw new ValidationError('DeliveryMethod name cannot be empty', 'name');
    }
    if (!Number.isFinite(v.baseCost) || v.baseCost < 0) {
      throw new ValidationError('DeliveryMethod baseCost must be non-negative', 'baseCost');
    }
    if (!Number.isInteger(v.estimatedDays) || v.estimatedDays < 0) {
      throw new ValidationError(
        'DeliveryMethod estimatedDays must be non-negative integer',
        'estimatedDays',
      );
    }
  }

  // ═══ Getters ═══
  get id(): DeliveryMethodIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): DeliveryMethodTypeVO { return this.value.type; }
  get carrier(): string | undefined { return this.value.carrier; }
  get baseCost(): number { return this.value.baseCost; }
  get currency(): string { return this.value.currency; }
  get estimatedDays(): number { return this.value.estimatedDays; }
  get isActive(): boolean { return this.value.isActive; }

  // ═══ Business methods ═══
  isFree(): boolean { return this.value.baseCost === 0; }
  isFast(): boolean { return this.value.estimatedDays <= 2; }
  hasCarrier(): boolean { return this.value.carrier !== undefined; }
}
