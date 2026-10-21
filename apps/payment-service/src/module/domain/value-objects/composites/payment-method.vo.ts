/**
 * PaymentMethod Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';

export interface PaymentMethodVOProps {
  readonly id: PaymentMethodIdVO;
  readonly type: PaymentMethodTypeVO;
  readonly provider?: PaymentMethodProviderVO;
  readonly label: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class PaymentMethodVO extends BaseVO<PaymentMethodVOProps> {
  private constructor(props: PaymentMethodVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: PaymentMethodVOProps): PaymentMethodVO {
    const vo = new PaymentMethodVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: PaymentMethodVOProps): PaymentMethodVO {
    return new PaymentMethodVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.label || v.label.trim().length === 0) {
      throw new ValidationError('PaymentMethod label required', 'label');
    }
    if (v.type.requiresGateway() && !v.provider) {
      throw new ValidationError('Online payment method requires a provider', 'provider');
    }
  }

  get id(): PaymentMethodIdVO { return this.value.id; }
  get type(): PaymentMethodTypeVO { return this.value.type; }
  get provider(): PaymentMethodProviderVO | undefined { return this.value.provider; }
  get label(): string { return this.value.label; }
  get isActive(): boolean { return this.value.isActive; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isOnline(): boolean { return this.type.isOnline(); }
  isCard(): boolean { return this.type.isCard(); }
  isCod(): boolean { return this.type.isCod(); }
  isUsable(): boolean { return this.isActive && (!this.type.requiresGateway() || !!this.provider); }
}
