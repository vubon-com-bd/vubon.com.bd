import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProductIdVO } from '../primitives/product-id.vo';
import { WeightVO } from '../primitives/weight.vo';
import { DimensionVO } from '../primitives/dimension.vo';

export interface ShipmentItemProps {
  readonly productId: ProductIdVO;
  readonly quantity: number;
  readonly weight: WeightVO | null;
  readonly dimension: DimensionVO | null;
}

export class ShipmentItemVO extends BaseVO<ShipmentItemProps> {
  private constructor(props: ShipmentItemProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ShipmentItemProps): ShipmentItemVO {
    if (props.quantity < 1) {
      throw new Error('Quantity must be at least 1');
    }
    return new ShipmentItemVO(props);
  }

  get productId(): ProductIdVO { return this.value.productId; }
  get quantity(): number { return this.value.quantity; }
  get weight(): WeightVO | null { return this.value.weight; }
  get dimension(): DimensionVO | null { return this.value.dimension; }
}
