/**
 * BillingAddressEntity — snapshot billing address on order
 * @module order-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BillingAddressIdVO } from '../value-objects/primitives/billing-address-id.vo.js';
import { BillingAddressLineVO } from '../value-objects/primitives/billing-address-line.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

export interface BillingAddressEntityProps {
  readonly orderId: string;
  readonly customerId: CustomerIdVO;
  readonly line: BillingAddressLineVO;
  readonly label?: string;
}

export class BillingAddressEntity extends BaseEntity<string> {
  private readonly _orderId: string;
  private readonly _customerId: CustomerIdVO;
  private readonly _line: BillingAddressLineVO;
  private readonly _label?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: BillingAddressEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._customerId = props.customerId;
    this._line = props.line;
    this._label = props.label;
  }

  get toIdVO(): BillingAddressIdVO { return BillingAddressIdVO.reconstitute(this.id); }
  get orderId(): string { return this._orderId; }
  get customerId(): CustomerIdVO { return this._customerId; }
  get line(): BillingAddressLineVO { return this._line; }
  get label(): string | undefined { return this._label; }

  get oneLine(): string { return this._line.oneLine; }
  get city(): string { return this._line.value.city; }
  get country(): string { return this._line.value.country; }

  static create(params: {
    id: string;
    props: BillingAddressEntityProps;
    now: string;
  }): BillingAddressEntity {
    return new BillingAddressEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: BillingAddressEntityProps;
  }): BillingAddressEntity {
    return new BillingAddressEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
