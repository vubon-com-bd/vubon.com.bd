import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InventoryIdVO } from '../primitives/inventory-id.vo';
import { InventoryQuantityVO } from '../primitives/inventory-quantity.vo';
import { InventoryStatusVO } from '../primitives/inventory-status.vo';

export interface ProductInventoryProps {
  readonly id: InventoryIdVO;
  readonly quantity: InventoryQuantityVO;
  readonly reserved: InventoryQuantityVO;
  readonly status: InventoryStatusVO;
}

export class ProductInventoryVO extends BaseVO<ProductInventoryProps> {
  private constructor(props: ProductInventoryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductInventoryProps): ProductInventoryVO {
    return new ProductInventoryVO(props);
  }

  get id(): InventoryIdVO { return this.value.id; }
  get quantity(): InventoryQuantityVO { return this.value.quantity; }
  get reserved(): InventoryQuantityVO { return this.value.reserved; }
  get status(): InventoryStatusVO { return this.value.status; }

  get available(): number {
    return this.value.quantity.value - this.value.reserved.value;
  }
}
