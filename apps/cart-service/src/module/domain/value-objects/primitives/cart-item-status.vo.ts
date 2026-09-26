import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'active',
  'removed',
  'saved',
  'out_of_stock',
  'unavailable',
]);

export class CartItemStatusVO extends BaseStatusVO<string> {
  static create(value: string): CartItemStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid cart item status: ${value}`);
    }
    return new CartItemStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
