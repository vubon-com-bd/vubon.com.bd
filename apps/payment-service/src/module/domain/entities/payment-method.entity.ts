/**
 * PaymentMethodEntity
 * @module payment-service/domain/entities
 *
 * Configuration entity — no state machine, only active/inactive toggle.
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';

export interface PaymentMethodEntityProps {
  readonly type: PaymentMethodTypeVO;
  readonly provider?: PaymentMethodProviderVO;
  readonly label: string;
  readonly isActive: boolean;
}

export class PaymentMethodEntity extends BaseEntity<string> {
  private _label: string;
  private _isActive: boolean;

  private readonly _type: PaymentMethodTypeVO;
  private readonly _provider?: PaymentMethodProviderVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PaymentMethodEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._provider = props.provider;
    this._label = props.label;
    this._isActive = props.isActive;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._label || this._label.trim().length === 0) {
      throw new ValidationError('PaymentMethod label required', 'label');
    }
    if (this._type.requiresGateway() && !this._provider) {
      throw new ValidationError(
        'Online payment method requires a provider',
        'provider',
      );
    }
  }

  get type(): PaymentMethodTypeVO { return this._type; }
  get provider(): PaymentMethodProviderVO | undefined { return this._provider; }
  get label(): string { return this._label; }
  get isActive(): boolean { return this._isActive; }

  isOnline(): boolean { return this._type.isOnline(); }
  isCod(): boolean { return this._type.isCod(); }

  rename(label: string, now: string = new Date().toISOString()): void {
    if (!label || label.trim().length === 0) {
      throw new ValidationError('PaymentMethod label required', 'label');
    }
    this._label = label.trim();
    this.touch(now);
  }

  activate(now: string = new Date().toISOString()): void {
    if (this._type.requiresGateway() && !this._provider) {
      throw new ValidationError(
        'Cannot activate online method without provider',
        'provider',
      );
    }
    this._isActive = true;
    this.touch(now);
  }

  deactivate(now: string = new Date().toISOString()): void {
    this._isActive = false;
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: PaymentMethodIdVO;
    props: PaymentMethodEntityProps;
    now: string;
  }): PaymentMethodEntity {
    return new PaymentMethodEntity(params.id.value, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: PaymentMethodEntityProps;
  }): PaymentMethodEntity {
    return new PaymentMethodEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
