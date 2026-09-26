import type { CartEntity } from '../entities/cart.entity';
import type { CartItemEntity } from '../entities/cart-item.entity';

export class CartValidationService {
  assertNotEmpty(cart: CartEntity): void {
    if (cart.isEmpty) {
      throw new Error('Cart is empty');
    }
  }

  assertHasSelectedItems(items: readonly CartItemEntity[]): void {
    const selected = items.filter((i) => i.selected && i.status.value === 'active');
    if (selected.length === 0) {
      throw new Error('No items selected for checkout');
    }
  }

  assertWithinLimits(cart: CartEntity, maxItems: number): void {
    if (cart.itemCount > maxItems) {
      throw new Error(`Cart exceeds max items: ${maxItems}`);
    }
  }
}
