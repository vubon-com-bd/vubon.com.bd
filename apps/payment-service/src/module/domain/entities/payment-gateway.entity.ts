/**
 * PaymentGatewayEntity
 * @module payment-service/domain/entities
 *
 * Gateway configuration + availability (active/maintenance).
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';

export interface PaymentGatewayEntityProps {
  readonly provider: PaymentMethodProviderVO;
  readonly displayName: string;
  readonly isActive: boolean;
  readonly isMaintenance: boolean;
  readonly supportedCurrencies: readonly string[];
  readonly minAmount: number;
  readonly maxAmount: number;
}

export class PaymentGatewayEntity extends BaseEntity<string> {
  private _isActive: boolean;
  private _isMaintenance: boolean;

  private readonly _provider: PaymentMethodProviderVO;
  private readonly _displayName: string;
  private readonly _supportedCurrencies: readonly string[];
  private readonly _minAmount: number;
  private readonly _maxAmount: number;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PaymentGatewayEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._provider = props.provider;
    this._displayName = props.displayName;
    this._isActive = props.isActive;
    this._isMaintenance = props.isMaintenance;
    this._supportedCurrencies = Object.freeze([...props.supportedCurrencies]);
    this._minAmount = props.minAmount;
    this._maxAmount = props.maxAmount;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._displayName || this._displayName.trim().length === 0) {
      throw new ValidationError('PaymentGateway displayName required', 'displayName');
    }
    if (this._supportedCurrencies.length === 0) {
      throw new ValidationError('PaymentGateway requires currencies', 'currencies');
    }
    if (this._minAmount < 0 || this._maxAmount <= this._minAmount) {
      throw new ValidationError('PaymentGateway min/max amounts invalid', 'amountRange');
    }
  }

  get provider(): PaymentMethodProviderVO { return this._provider; }
  get displayName(): string { return this._displayName; }
  get isActive(): boolean { return this._isActive; }
  get isMaintenance(): boolean { return this._isMaintenance; }
  get supportedCurrencies(): readonly string[] { return this._supportedCurrencies; }
  get minAmount(): number { return this._minAmount; }
  get maxAmount(): number { return this._maxAmount; }

  isAvailable(): boolean { return this._isActive && !this._isMaintenance; }

  supportsCurrency(currency: string): boolean {
    return this._supportedCurrencies.includes(currency.toUpperCase());
  }

  supportsAmount(amount: number): boolean {
    return amount >= this._minAmount && amount <= this._maxAmount;
  }

  activate(now: string = new Date().toISOString()): void {
    this._isActive = true;
    this.touch(now);
  }

  deactivate(now: string = new Date().toISOString()): void {
    this._isActive = false;
    this.touch(now);
  }

  enterMaintenance(now: string = new Date().toISOString()): void {
    this._isMaintenance = true;
    this.touch(now);
  }

  exitMaintenance(now: string = new Date().toISOString()): void {
    this._isMaintenance = false;
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: PaymentGatewayEntityProps;
    now: string;
  }): PaymentGatewayEntity {
    return new PaymentGatewayEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: PaymentGatewayEntityProps;
  }): PaymentGatewayEntity {
    return new PaymentGatewayEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
