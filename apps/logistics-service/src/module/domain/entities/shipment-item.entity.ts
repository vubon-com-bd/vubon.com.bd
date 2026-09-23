import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import { WeightVO } from '../value-objects/primitives/weight.vo';
import { DimensionVO } from '../value-objects/primitives/dimension.vo';

export interface ShipmentItemEntityProps {
  readonly shipmentId: ShipmentIdVO;
  readonly productId: ProductIdVO;
  readonly quantity: number;
  readonly weight: WeightVO | null;
  readonly dimension: DimensionVO | null;
}

export class ShipmentItemEntity extends BaseEntity<string> {
  private readonly _shipmentId: ShipmentIdVO;
  private readonly _productId: ProductIdVO;
  private readonly _quantity: number;
  private readonly _weight: WeightVO | null;
  private readonly _dimension: DimensionVO | null;

  private constructor(
    id: string,
    props: ShipmentItemEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._shipmentId = props.shipmentId;
    this._productId = props.productId;
    this._quantity = props.quantity;
    this._weight = props.weight;
    this._dimension = props.dimension;
  }

  static create(props: ShipmentItemEntityProps): ShipmentItemEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new ShipmentItemEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: ShipmentItemEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ShipmentItemEntity {
    return new ShipmentItemEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get shipmentId(): ShipmentIdVO { return this._shipmentId; }
  get productId(): ProductIdVO { return this._productId; }
  get quantity(): number { return this._quantity; }
  get weight(): WeightVO | null { return this._weight; }
  get dimension(): DimensionVO | null { return this._dimension; }
}
