import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PaymentGatewayVO } from '../value-objects/primitives/payment-gateway.vo';

export interface PaymentGatewayEntityProps {
  readonly gateway: PaymentGatewayVO;
  readonly status: string;
  readonly env: string;
  readonly isLocal: boolean;
  readonly supportedCurrencies: readonly string[];
}

export class PaymentGatewayEntity extends BaseEntity<string> {
  private readonly _gateway: PaymentGatewayVO;
  private readonly _status: string;
  private readonly _env: string;
  private readonly _isLocal: boolean;
  private readonly _supportedCurrencies: readonly string[];

  private constructor(
    id: string,
    props: PaymentGatewayEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._gateway = props.gateway;
    this._status = props.status;
    this._env = props.env;
    this._isLocal = props.isLocal;
    this._supportedCurrencies = Object.freeze([...props.supportedCurrencies]);
  }

  static create(props: PaymentGatewayEntityProps): PaymentGatewayEntity {
    const now = new Date().toISOString();
    return new PaymentGatewayEntity(props.gateway.value, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: PaymentGatewayEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PaymentGatewayEntity {
    return new PaymentGatewayEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get gateway(): PaymentGatewayVO { return this._gateway; }
  get status(): string { return this._status; }
  get env(): string { return this._env; }
  get isLocal(): boolean { return this._isLocal; }
  get supportedCurrencies(): readonly string[] { return this._supportedCurrencies; }
}
