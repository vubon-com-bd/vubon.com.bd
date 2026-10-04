/**
 * ShippingAddressEntity — snapshot address on order
 * @module order-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ShippingAddressIdVO } from '../value-objects/primitives/shipping-address-id.vo.js';
import { ShippingAddressLineVO } from '../value-objects/primitives/shipping-address-line.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

export interface ShippingAddressEntityProps {
  readonly orderId: string;
  readonly customerId: CustomerIdVO;
  readonly line: ShippingAddressLineVO;
  readonly label?: string;
}

export class ShippingAddressEntity extends BaseEntity<string> {
  private readonly _orderId: string;
  private readonly _customerId: CustomerIdVO;
  private readonly _line: ShippingAddressLineVO;
  private readonly _label?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ShippingAddressEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._customerId = props.customerId;
    this._line = props.line;
    this._label = props.label;
  }

  get toIdVO(): ShippingAddressIdVO { return ShippingAddressIdVO.reconstitute(this.id); }
  get orderId(): string { return this._orderId; }
  get customerId(): CustomerIdVO { return this._customerId; }
  get line(): ShippingAddressLineVO { return this._line; }
  get label(): string | undefined { return this._label; }

  get oneLine(): string { return this._line.oneLine; }
  get city(): string { return this._line.value.city; }
  get country(): string { return this._line.value.country; }

  isInternational(): boolean { return this._line.value.country !== 'BD'; }

  static create(params: {
    id: string;
    props: ShippingAddressEntityProps;
    now: string;
  }): ShippingAddressEntity {
    return new ShippingAddressEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ShippingAddressEntityProps;
  }): ShippingAddressEntity {
    return new ShippingAddressEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
