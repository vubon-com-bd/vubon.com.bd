/**
 * DeliveryMethodVO
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
  private constructor(props: DeliveryMethodVOProps) { super(props); }

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
    if (!v.name || v.name.trim().length === 0) {
      throw new ValidationError('Method name cannot be empty', 'name');
    }
    if (v.name.length > 100) {
      throw new ValidationError('Method name cannot exceed 100 chars', 'name');
    }
    if (v.baseCost < 0) {
      throw new ValidationError('Base cost cannot be negative', 'baseCost');
    }
    if (v.estimatedDays < 0 || v.estimatedDays > 30) {
      throw new ValidationError('Estimated days must be 0-30', 'estimatedDays');
    }
    if (v.currency.length !== 3) {
      throw new ValidationError('Currency must be 3-char code', 'currency');
    }
  }

  get id(): DeliveryMethodIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): DeliveryMethodTypeVO { return this.value.type; }
  get carrier(): string | undefined { return this.value.carrier; }
  get baseCost(): number { return this.value.baseCost; }
  get currency(): string { return this.value.currency; }
  get estimatedDays(): number { return this.value.estimatedDays; }
  get isActive(): boolean { return this.value.isActive; }

  isFree(): boolean {
    return this.baseCost === 0;
  }

  isFast(): boolean {
    return this.estimatedDays <= 2;
  }

  isInternational(): boolean {
    return this.type.isInternational();
  }
}
