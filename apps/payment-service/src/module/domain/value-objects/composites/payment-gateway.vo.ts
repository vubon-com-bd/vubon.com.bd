/**
 * PaymentGateway Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';

export interface PaymentGatewayVOProps {
  readonly provider: PaymentMethodProviderVO;
  readonly displayName: string;
  readonly isActive: boolean;
  readonly isMaintenance: boolean;
  readonly supportedCurrencies: readonly string[];
  readonly minAmount: number;
  readonly maxAmount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class PaymentGatewayVO extends BaseVO<PaymentGatewayVOProps> {
  private constructor(props: PaymentGatewayVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: PaymentGatewayVOProps): PaymentGatewayVO {
    const vo = new PaymentGatewayVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: PaymentGatewayVOProps): PaymentGatewayVO {
    return new PaymentGatewayVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.displayName || v.displayName.trim().length === 0) {
      throw new ValidationError('PaymentGateway displayName required', 'displayName');
    }
    if (v.supportedCurrencies.length === 0) {
      throw new ValidationError('PaymentGateway requires at least one currency', 'currencies');
    }
    if (v.minAmount < 0 || v.maxAmount <= v.minAmount) {
      throw new ValidationError('PaymentGateway min/max amounts invalid', 'amountRange');
    }
  }

  get provider(): PaymentMethodProviderVO { return this.value.provider; }
  get displayName(): string { return this.value.displayName; }
  get isActive(): boolean { return this.value.isActive; }
  get isMaintenance(): boolean { return this.value.isMaintenance; }
  get supportedCurrencies(): readonly string[] { return [...this.value.supportedCurrencies]; }
  get minAmount(): number { return this.value.minAmount; }
  get maxAmount(): number { return this.value.maxAmount; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isAvailable(): boolean { return this.isActive && !this.isMaintenance; }

  supportsCurrency(currency: string): boolean {
    return this.value.supportedCurrencies.includes(currency.toUpperCase());
  }

  supportsAmount(amount: number): boolean {
    return amount >= this.minAmount && amount <= this.maxAmount;
  }
}
