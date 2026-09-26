import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PaymentMethodIdVO } from '../value-objects/primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '../value-objects/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '../value-objects/primitives/payment-method-provider.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface PaymentMethodEntityProps {
  readonly userId: UserIdVO;
  readonly type: PaymentMethodTypeVO;
  readonly provider: PaymentMethodProviderVO | null;
  readonly cardToken: string | null;
  readonly cardLast4: string | null;
  readonly cardBrand: string | null;
  readonly cardExpiry: string | null;
  readonly isDefault: boolean;
  readonly isActive: boolean;
}

export class PaymentMethodEntity extends AggregateRoot<PaymentMethodIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: PaymentMethodTypeVO;
  private readonly _provider: PaymentMethodProviderVO | null;
  private readonly _cardToken: string | null;
  private readonly _cardLast4: string | null;
  private readonly _cardBrand: string | null;
  private readonly _cardExpiry: string | null;
  private readonly _isDefault: boolean;
  private readonly _isActive: boolean;

  private constructor(
    id: PaymentMethodIdVO,
    props: PaymentMethodEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._provider = props.provider;
    this._cardToken = props.cardToken;
    this._cardLast4 = props.cardLast4;
    this._cardBrand = props.cardBrand;
    this._cardExpiry = props.cardExpiry;
    this._isDefault = props.isDefault;
    this._isActive = props.isActive;
  }

  static create(props: PaymentMethodEntityProps): PaymentMethodEntity {
    const now = new Date().toISOString();
    const id = PaymentMethodIdVO.create(crypto.randomUUID());
    return new PaymentMethodEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PaymentMethodIdVO,
    props: PaymentMethodEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PaymentMethodEntity {
    return new PaymentMethodEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  setAsDefault(): PaymentMethodEntity {
    return new PaymentMethodEntity(
      this.id,
      { ...this._toProps(), isDefault: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  deactivate(): PaymentMethodEntity {
    return new PaymentMethodEntity(
      this.id,
      { ...this._toProps(), isActive: false, isDefault: false },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): PaymentMethodTypeVO { return this._type; }
  get provider(): PaymentMethodProviderVO | null { return this._provider; }
  get cardToken(): string | null { return this._cardToken; }
  get cardLast4(): string | null { return this._cardLast4; }
  get cardBrand(): string | null { return this._cardBrand; }
  get cardExpiry(): string | null { return this._cardExpiry; }
  get isDefault(): boolean { return this._isDefault; }
  get isActive(): boolean { return this._isActive; }

  private _toProps(): PaymentMethodEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      provider: this._provider,
      cardToken: this._cardToken,
      cardLast4: this._cardLast4,
      cardBrand: this._cardBrand,
      cardExpiry: this._cardExpiry,
      isDefault: this._isDefault,
      isActive: this._isActive,
    };
  }
}
