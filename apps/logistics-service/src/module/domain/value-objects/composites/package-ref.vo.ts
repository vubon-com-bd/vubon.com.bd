/**
 * PackageRefVO — link from shipment back to order items
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface PackageRefValue {
  readonly orderItemId: string;
  readonly productId?: string;
  readonly variantId?: string;
  readonly sku?: string;
  readonly quantity: number;
  readonly name?: string;
}

export class PackageRefVO extends BaseVO<PackageRefValue> {
  private constructor(value: PackageRefValue) { super(value); }

  static create(input: PackageRefValue): PackageRefVO {
    if (!input.orderItemId || input.orderItemId.trim().length === 0) {
      throw new ValidationError('orderItemId required for package ref', 'orderItemId');
    }
    if (!Number.isInteger(input.quantity) || input.quantity < 1) {
      throw new ValidationError('Quantity must be >= 1', 'quantity');
    }
    return new PackageRefVO({
      orderItemId: input.orderItemId.trim(),
      productId: input.productId,
      variantId: input.variantId,
      sku: input.sku,
      quantity: input.quantity,
      name: input.name,
    });
  }

  static reconstitute(value: PackageRefValue): PackageRefVO {
    return new PackageRefVO(value);
  }

  get orderItemId(): string { return this.value.orderItemId; }
  get productId(): string | undefined { return this.value.productId; }
  get variantId(): string | undefined { return this.value.variantId; }
  get sku(): string | undefined { return this.value.sku; }
  get quantity(): number { return this.value.quantity; }
  get name(): string | undefined { return this.value.name; }

  hasVariant(): boolean { return this.value.variantId !== undefined; }
}
